@echo off
echo Deploying Firestore Rules...
echo.
echo Step 1: Login to Firebase (if not already logged in)
firebase login
echo.
echo Step 2: Set the Firebase project
firebase use soccer-e91a6
echo.
echo Step 3: Deploy the rules
firebase deploy --only firestore:rules
echo.
echo Rules deployed successfully!
pause

