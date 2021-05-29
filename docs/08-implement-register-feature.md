# Implement register feature

1. Enable sign-in methods in the [Firebase Console](https://console.firebase.google.com/)

   - In the sidebar, click on **"Authentication"**
   - Click the **"Sign-in method"** tab
   - Enable the **"Email/Password"** and **"Google"** sign-in methods

1. Implement `registerWithEmail` method in `src/pages/RegisterPage.vue`

   ```diff
     <script>
   + import firebase, { auth } from '@lib/firebase';

     ...

       methods: {
   -     registerWithEmail(data) {
   -       console.log(data);
   +     async registerWithEmail(data) {
   +       try {
   +         const credential = await auth.createUserWithEmailAndPassword(data.email, data.password);
   +         await credential.user.updateProfile({ displayName: data.name });
   +       } catch (error) {
   +         console.error(error);
   +       }
         },
   ```

1. Handle authentication state changes in `src/index.js`

   ```diff
     import { createApp } from 'vue';
     import router from '@lib/router';
   + import { auth } from '@lib/firebase';
     import App from '@components/App.vue';

   + auth.onAuthStateChanged((user) => {
   +   if (user) {
   +     router.push({ name: 'feed' });
   +   } else {
   +     router.push({ name: 'login' });
   +   }
   + });
   ```

1. Implement `registerWithGoogle` method in `src/pages/RegisterPage.vue`

   ```diff
   - registerWithGoogle() {
   -   console.log('register with google');
   + async registerWithGoogle() {
   +   try {
   +     const provider = new firebase.auth.GoogleAuthProvider();
   +     await auth.signInWithPopup(provider);
   +   } catch (error) {
   +     console.log(error);
   +   }
     },
   ```

### Switch to completed branch for this step:

```bash
git checkout 08-implement-register-feature
```

---

- [**Return to previous step**](07-initialize-firebase-project.md)
- [**Proceed to next step**](09-implement-login-feature.md)
