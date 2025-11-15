'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserData, UserData, updateUserProfile, updateNotificationPreferences } from '@/lib/userService';

export function useUserData() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) {
      setUserData(null);
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUserData(currentUser.uid);
        setUserData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch user data');
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const updateProfile = async (profileData: {
    displayName?: string;
    photoURL?: string;
    phone?: string;
    location?: string;
    username?: string;
  }) => {
    if (!currentUser) return;

    try {
      setError(null);
      await updateUserProfile(currentUser.uid, profileData);
      // Refresh user data
      const updatedData = await getUserData(currentUser.uid);
      setUserData(updatedData);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
      throw err;
    }
  };

  const updateNotifications = async (preferences: {
    emailNotifications?: boolean;
    pushNotifications?: boolean;
    commentReplies?: boolean;
  }) => {
    if (!currentUser) return;

    try {
      setError(null);
      await updateNotificationPreferences(currentUser.uid, preferences);
      // Refresh user data
      const updatedData = await getUserData(currentUser.uid);
      setUserData(updatedData);
    } catch (err: any) {
      setError(err.message || 'Failed to update notification preferences');
      throw err;
    }
  };

  return {
    userData,
    loading,
    error,
    updateProfile,
    updateNotifications,
  };
}

