# Setup Firebase Emulators Suite

1. In a separate terminal, run the Firebase Emulators Suite

   ```bash
   firebase emulators:start

   # If you want to persist data across emulator restarts:
   firebase emulators:start --import=data --export-on-exit
   ```

1. Add environment variables in `.env.local`

   ```diff
   + VITE_USE_EMULATORS=true

     GOOGLE_APPLICATION_CREDENTIALS=/Users/arnelle/dev/personal/instagram-clone/service-account.json
   + FIREBASE_AUTH_EMULATOR_HOST=localhost:9099
   + FIRESTORE_EMULATOR_HOST=localhost:8080
   + FIRESTORE_STORAGE_EMULATOR_HOST=localhost:9199
   ```

1. Change `src/lib/firebase.js` to connect to emulators

   ```diff
     export default firebase;
     export const auth = firebase.auth();
     export const db = firebase.firestore();
     export const storage = firebase.storage();
     export const functions = firebase.functions();

   + if (import.meta.env.VITE_USE_EMULATORS === 'true') {
   +   auth.useEmulator('http://localhost:9099');
   +   db.useEmulator('localhost', 8080);
   +   storage.useEmulator('localhost', 9199);
   +   functions.useEmulator('localhost', 5001);
   + }
   ```

1. Change `functions/index.js` to connect to emulators

   ```diff
   + const path = require('path');
   + require('dotenv').config({
   +   path: path.resolve(__dirname, '../.env.local'),
   + });

     const admin = require('firebase-admin');
     const functions = require('firebase-functions');
   ```

1. Install `dotenv` inside `functions` directory

   ```bash
   cd functions
   npm install dotenv
   cd ..
   ```

### Switch to completed branch for this step:

```bash
git checkout 16-setup-firebase-emulators-suite
```

---

- [**Return to previous step**](15-create-user-profiles.md)
- [**Proceed to next step**](17-implement-newpostform-ui.md)
