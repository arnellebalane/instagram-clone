# Implement login feature

1. Implement `loginWithEmail` method in `src/pages/LoginPage.vue`

   ```diff
     <script>
   +   import firebase, { auth } from '@lib/firebase';

     ...

     methods: {
   -   loginWithEmail(data) {
   -     console.log(data);
   +   async loginWithEmail(data) {
   +     try {
   +       await auth.signInWithEmailAndPassword(data.email, data.password);
   +     } catch (error) {
   +       console.error(error);
   +     }
       },
   ```

1. Implement `loginWithGoogle` method in `src/pages/LoginPage.vue`

   ```diff
   - loginWithGoogle() {
   -   console.log('login with google');
   + async loginWithGoogle() {
   +   try {
   +     const provider = new firebase.auth.GoogleAuthProvider();
   +     await auth.signInWithPopup(provider);
   +   } catch (error) {
   +     console.error(error);
   +   }
     },
   ```

### Switch to completed branch for this step:

```bash
git checkout 09-implement-login-feature
```

---

- [**Return to previous step**](08-implement-register-feature.md)
- [**Proceed to next step**](10-setup-store.md)
