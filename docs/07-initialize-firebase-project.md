# Initialize Firebase project

1. Create a new project in the [Firebase Console](https://console.firebase.google.com/)

1. In the project's overview page, click on **"Add app"** and select the Web platform

   1. Give the app a nickname, and check the **"Also set up Firebase Hosting for this app"** checkbox
   1. Click on **"Register app**
   1. Click **"Next"** for steps 2 and 3, we will do this ourselves later
   1. Click **"Continue to console"** for step 4

1. Add `firebase` to our project's dependencies

   ```bash
   npm install firebase
   ```

1. Create `src/lib/firebase.js`

   ```js
   import firebase from 'firebase/app';
   import 'firebase/auth';
   import 'firebase/firestore';
   import 'firebase/storage';
   import 'firebase/functions';

   firebase.initializeApp({
     apiKey: 'REPLACE_THIS_VALUE',
     authDomain: 'REPLACE_THIS_VALUE',
     projectId: 'REPLACE_THIS_VALUE',
     storageBucket: 'REPLACE_THIS_VALUE',
     messagingSenderId: 'REPLACE_THIS_VALUE',
     appId: 'REPLACE_THIS_VALUE',
   });

   export default firebase;
   export const auth = firebase.auth();
   export const db = firebase.firestore();
   export const storage = firebase.storage();
   export const functions = firebase.functions();
   ```

   - We can get the configuration specific for our project from the [Firebase Console](https://console.firebase.google.com/)
     - In the sidebar, click on the gear icon near the top, then click on **"Project settings"**
     - Under the **"General"** tab, in the **"Your apps"** section, select the app that we created earlier
     - In the **"SDK setup and configuration"** section, select the radio button for **"Config"**
     - Use this configuration values in `src/lib/firebase.js`

1. Initialize Firebase inside our project

   ```bash
   firebase init
   ```

   - Select `Firestore`, `Functions`, `Hosting`, `Storage`, and `Emulators`, then press `Enter`
   - During the **"Project Setup"**, select **"Use an existing project"**, then select the Firebase project that we created at the beginning
   - We can use the default values for most of the questions (just press `Enter`), except for the following:

     - "What do you want to use as your public directory?", input `dist`
     - "Configure as a single-page app (rewrite all urls to /index.html)?", input `y`
     - "Set up automatic builds and deploys with GitHub?", input `y`
     - "Set up the workflow to run a build script before every deploy?", input `y`
     - "What is the name of the GitHub branch associated with your site's live channel?", input `00-start`
     - "Which Firebase emulators do you want to set up?", select `Authentication`, `Functions`, `Firestore`, and `Storage` emulators
     - "Would you like to download the emulators now?", input `y`

   - This will generate the following files and directories:

     ```bash
     .firebaserc
     .github/
     firebase.json
     firestore.indexes.json
     firestore.rules
     functions/
     storage.rules
     ```

### Switch to completed branch for this step:

```bash
git checkout 07-initialize-firebase-project
```

After switching to this branch, be sure to run `firebase init` and use your own Firebase project, and set your own values in `src/lib/firebase.js`.

---

- [**Return to previous step**](06-implement-register-page-ui.md)
- [**Proceed to next step**](08-implement-register-feature.md)
