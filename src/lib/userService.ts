import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { User } from 'firebase/auth';

export interface UserData {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  phone?: string;
  location?: string;
  username?: string;
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  commentReplies?: boolean;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

/**
 * Create a new user document in Firestore
 */
export async function createUserDocument(user: User, additionalData?: Partial<UserData>): Promise<void> {
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const { displayName, email, photoURL } = user;
    
    try {
      await setDoc(userRef, {
        uid: user.uid,
        email: email || '',
        displayName: displayName || '',
        photoURL: photoURL || '',
        emailNotifications: true,
        pushNotifications: true,
        commentReplies: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user document:', error);
      throw error;
    }
  }
}

/**
 * Get user data from Firestore
 */
export async function getUserData(uid: string): Promise<UserData | null> {
  if (!uid) return null;

  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data() as UserData;
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
}

/**
 * Update user data in Firestore
 */
export async function updateUserData(uid: string, data: Partial<UserData>): Promise<void> {
  if (!uid) return;

  try {
    const userRef = doc(db, 'users', uid);
    
    // Remove undefined values - Firestore doesn't allow undefined
    const cleanData: Record<string, any> = {
      updatedAt: serverTimestamp(),
    };
    
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof UserData];
      // Only include defined values (not undefined)
      // Empty strings are allowed, but undefined is not
      if (value !== undefined && value !== null) {
        cleanData[key] = value;
      }
    });
    
    await updateDoc(userRef, cleanData);
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
}

/**
 * Update user profile (displayName, photoURL, etc.)
 */
export async function updateUserProfile(uid: string, profileData: {
  displayName?: string;
  photoURL?: string;
  phone?: string;
  location?: string;
  username?: string;
}): Promise<void> {
  await updateUserData(uid, profileData);
}

/**
 * Update user notification preferences
 */
export async function updateNotificationPreferences(uid: string, preferences: {
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  commentReplies?: boolean;
}): Promise<void> {
  await updateUserData(uid, preferences);
}

