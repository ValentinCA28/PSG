# Firestore Security Rules Setup

## Quick Setup Instructions

### Option 1: Firebase Console (Recommended)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **soccer-e91a6**
3. Navigate to **Firestore Database** in the left sidebar
4. Click on the **Rules** tab
5. Replace the existing rules with the rules from `firestore.rules` file
6. Click **Publish** to save the rules

### Option 2: Firebase CLI

If you have Firebase CLI installed:

```bash
# Login to Firebase
firebase login

# Initialize Firebase in your project (if not already done)
firebase init firestore

# Deploy the rules
firebase deploy --only firestore:rules
```

## Rules Explanation

The provided rules ensure:

- ✅ **Authenticated users** can read and write their own user document
- ✅ Users can only access documents where the document ID matches their UID
- ✅ Unauthenticated users cannot access any user data
- ✅ Users cannot access other users' data

## Testing the Rules

After deploying the rules, test them:

1. **Test Read Access:**
   - Log in to your app
   - Navigate to Settings page
   - Your user data should load without errors

2. **Test Write Access:**
   - Update your profile in Settings
   - Click "Save Changes"
   - You should see a success toast notification

3. **Test Security:**
   - Try to access another user's document (should fail)
   - Try to access without authentication (should fail)

## Current Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Troubleshooting

### If you still get permission errors:

1. **Check Authentication:**
   - Make sure the user is logged in
   - Verify `request.auth.uid` matches the document ID

2. **Check Document ID:**
   - User documents must use the user's UID as the document ID
   - Format: `users/{userId}` where `userId` is the Firebase Auth UID

3. **Wait for Propagation:**
   - Rules can take a few seconds to propagate
   - Try refreshing the app after deploying rules

4. **Check Browser Console:**
   - Look for specific error messages
   - Common errors:
     - "Missing or insufficient permissions" - Rules not deployed or incorrect
     - "Permission denied" - User not authenticated or UID mismatch

## Adding More Collections

When you add more collections, follow this pattern:

```javascript
match /yourCollection/{documentId} {
  // Allow users to read their own documents
  allow read: if request.auth != null && resource.data.userId == request.auth.uid;
  
  // Allow users to create documents with their UID
  allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
  
  // Allow users to update/delete their own documents
  allow update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
}
```

