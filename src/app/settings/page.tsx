'use client';

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { useUserData } from "@/hooks/useUserData";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function SettingsPage() {
  const { currentUser } = useAuth();
  const { userData, loading: userDataLoading, updateProfile, updateNotifications } = useUserData();
  
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [username, setUsername] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [commentReplies, setCommentReplies] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load user data from Firestore
  useEffect(() => {
    if (userData) {
      setDisplayName(userData.displayName || '');
      setPhone(userData.phone || '');
      setLocation(userData.location || '');
      setUsername(userData.username || '');
      setEmailNotifications(userData.emailNotifications ?? true);
      setPushNotifications(userData.pushNotifications ?? true);
      setCommentReplies(userData.commentReplies ?? false);
    } else if (currentUser) {
      // Fallback to Auth data if Firestore data not loaded yet
      setDisplayName(currentUser.displayName || '');
    }
  }, [userData, currentUser]);

  const displayNameValue = userData?.displayName || currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User';
  const initials = displayNameValue
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';

  const handleSaveProfile = async () => {
    if (!currentUser) return;

    setSaving(true);
    try {
      // Build profile data object, only including fields that have values
      const profileData: {
        displayName?: string;
        phone?: string;
        location?: string;
        username?: string;
      } = {};
      
      if (displayName.trim()) profileData.displayName = displayName.trim();
      if (phone.trim()) profileData.phone = phone.trim();
      if (location.trim()) profileData.location = location.trim();
      if (username.trim()) profileData.username = username.trim();
      
      await updateProfile(profileData);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotifications = async () => {
    if (!currentUser) return;

    setSaving(true);
    try {
      await updateNotifications({
        emailNotifications,
        pushNotifications,
        commentReplies,
      });
      toast.success('Notification preferences updated!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update notification preferences');
    } finally {
      setSaving(false);
    }
  };

  if (userDataLoading) {
    return (
      <ProtectedRoute>
        <div className="flex flex-col h-full">
          <Header />
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-full">
        <Header />
      <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>

        {/* My Profile */}
        <Card>
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={currentUser?.photoURL || undefined} alt={displayNameValue} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-lg">{displayNameValue}</p>
                <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input 
                  id="displayName" 
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name"
                  disabled={saving}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={currentUser?.email || ''}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 234 567 8900"
                  disabled={saving}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, Country"
                  disabled={saving}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  disabled={saving}
                />
              </div>
            </div>
            <Button onClick={handleSaveProfile} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="lottie_poole" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <Button>Update Account</Button>
          </CardContent>
        </Card>

        {/* Notifications Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email notifications about your account activity
                </p>
              </div>
              <Switch 
                id="email-notifications" 
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
                disabled={saving}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications on your device
                </p>
              </div>
              <Switch 
                id="push-notifications" 
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
                disabled={saving}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="comment-replies">New Comment Replies</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when someone replies to your comments
                </p>
              </div>
              <Switch 
                id="comment-replies" 
                checked={commentReplies}
                onCheckedChange={setCommentReplies}
                disabled={saving}
              />
            </div>
            <Button onClick={handleSaveNotifications} disabled={saving} className="mt-4">
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Notification Preferences'
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Manage your payment methods and billing information
            </p>
            <Button variant="outline" className="mt-4">Add Payment Method</Button>
          </CardContent>
        </Card>
      </div>
    </div>
    </ProtectedRoute>
  );
}

