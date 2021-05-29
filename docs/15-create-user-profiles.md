# Create user profiles

1. Add `createUserProfile` Cloud Function in `functions/index.js` (replace current contents)

   ```js
   const admin = require('firebase-admin');
   const functions = require('firebase-functions');

   admin.initializeApp();
   const db = admin.firestore();

   exports.createUserProfile = functions.auth.user().onCreate((user) => {
     return db.doc(`users/${user.uid}`).set({
       displayName: user.displayName,
       photoURL: user.photoURL,
       description: 'Hello world!',
       postsCount: 0,
       followersCount: 0,
       followingCount: 0,
     });
   });
   ```

1. Generate a Firebase Admin SDK service account from the [Firebase Console](https://console.firebase.google.com/)

   - In the sidebar, click on the gear icon near the top, then click on **"Users and permissions"**
   - Under the **"Service accounts"** tab, select **"Firebase Admin SDK"**
   - Click on the **"Generate new private key"** button, this will download your service account file
   - Place the service account file as `service-account.json` at the root directory of this repository
   - **IMPORTANT:** Keep this service account file confidential (it is already ignored by this repository and won't be checked into version control), anyone with access to this file will have access to your Firebase project

1. Create `.env.local` (replace with full path to your `service-account.json` file)

   ```bash
   GOOGLE_APPLICATION_CREDENTIALS=/Users/arnelle/dev/personal/instagram-clone/service-account.json
   ```

1. Install `firebase-admin` and `dotenv`

   ```bash
   npm install firebase-admin dotenv
   ```

1. Create `scripts/create-user-profiles.js`

   ```js
   const path = require('path');
   require('dotenv').config({
     path: path.resolve(__dirname, '../.env.local'),
   });

   const admin = require('firebase-admin');
   admin.initializeApp();

   const auth = admin.auth();
   const db = admin.firestore();

   (async () => {
     const result = await auth.listUsers(1000);
     for (const user of result.users) {
       await db.doc(`users/${user.uid}`).set({
         displayName: user.displayName || null,
         photoURL: user.photoURL || null,
         description: 'Hello world!',
         postsCount: 0,
         followersCount: 0,
         followingCount: 0,
       });
     }
   })();
   ```

1. Run the `create-user-profiles.js` script to create user profiles for existing users

   ```bash
   node scripts/create-user-profiles.js
   ```

1. Deploy Cloud Functions

   ```bash
   firebase deploy --only functions
   ```

   - **NOTE:** You will need the [**Blaze (Pay as you go)**](https://firebase.google.com/pricing) plan in order to deploy and run Cloud Functions in production.

### Switch to completed branch for this step:

```bash
git checkout 15-create-user-profiles
```

---

- [**Return to previous step**](14-add-header-component.md)
- [**Proceed to next step**](16-setup-firebase-emulators-suite.md)
