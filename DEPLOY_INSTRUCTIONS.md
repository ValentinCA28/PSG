# Deploy Firestore Rules - Quick Guide

## Option 1: Using the Batch Script (Windows)

1. Double-click `deploy-rules.bat` in your project folder
2. Follow the prompts to login if needed
3. The rules will be deployed automatically

## Option 2: Manual Deployment (All Platforms)

Run these commands in your terminal:

### Step 1: Login to Firebase
```bash
firebase login
```
This will open a browser window for authentication.

### Step 2: Set Your Firebase Project
```bash
firebase use soccer-e91a6
```

### Step 3: Deploy the Rules
```bash
firebase deploy --only firestore:rules
```

## What You'll See

After running the deploy command, you should see:
```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/soccer-e91a6/overview
```

## Verify the Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **soccer-e91a6**
3. Navigate to **Firestore Database** → **Rules** tab
4. You should see the deployed rules

## Troubleshooting

### "Failed to authenticate"
- Run `firebase login` first
- Make sure you're logged in with the correct Google account

### "Project not found"
- Make sure the project ID is correct: `soccer-e91a6`
- Verify you have access to the project in Firebase Console

### "Permission denied"
- Make sure you have Owner or Editor role on the Firebase project
- Check your Firebase project permissions

