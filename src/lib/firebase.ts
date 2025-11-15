// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh1liZvl1-pSKBXg9YvwR3-mWPPjlW0wY",
  authDomain: "soccer-e91a6.firebaseapp.com",
  projectId: "soccer-e91a6",
  storageBucket: "soccer-e91a6.firebasestorage.app",
  messagingSenderId: "677731440326",
  appId: "1:677731440326:web:5b3510767424fdc893e9c7",
  measurementId: "G-GG0MVN1VMT"
};

// Initialize Firebase
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Firebase Auth
export const auth: Auth = getAuth(app);

// Initialize Firestore
export const db: Firestore = getFirestore(app);

// Initialize Analytics (only in browser)
export const analytics: Analytics | null = 
  typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;

