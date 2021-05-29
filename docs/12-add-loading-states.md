# Add loading states

1. Add `isLoading` state in `src/pages/LoginPage.vue`

   ```diff
     export default {
       components: {
         LoginForm,
         AuthCard,
         AuthSeparator,
         AuthButton,
         AuthFooter,
       },

   +   data() {
   +     return {
   +       isLoading: false,
   +     };
   +   },

       methods: {
         async loginWithEmail(data) {
   +       this.isLoading = true;
           try {
             await auth.signInWithEmailAndPassword(data.email, data.password);
           } catch (error) {
             console.error(error);
           }
   +       this.isLoading = false;
         },

         async loginWithGoogle() {
   +       this.isLoading = true;
           try {
             const provider = new firebase.auth.GoogleAuthProvider();
             await auth.signInWithPopup(provider);
           } catch (error) {
             console.error(error);
           }
   +       this.isLoading = false;
         },
       },
     };
   ```

1. Disable `LoginForm` and `AuthButton` in `src/pages/LoginPage.vue` while loading

   ```diff
     <AuthCard>
       <img src="@assets/images/logo.png" alt="Instagram logo" />

   -   <LoginForm @submit="loginWithEmail" />
   +   <LoginForm :disabled="isLoading" @submit="loginWithEmail" />
       <AuthSeparator />
   -   <AuthButton @click="loginWithGoogle" />
   +   <AuthButton :disabled="isLoading" @click="loginWithGoogle" />
     </AuthCard>
   ```

1. Accept `disabled` prop in `src/components/LoginForm.vue`

   ```diff
     <template>
       <form @submit.prevent="submitForm">
   -     <input type="email" name="email" placeholder="Email" v-model="email" required />
   -     <input type="password" name="password" placeholder="Password" v-model="password" required />
   +     <input type="email" name="email" placeholder="Email" v-model="email" :disabled="disabled" required />
   +     <input type="password" name="password" placeholder="Password" v-model="password" :disabled="disabled" required />

   -     <button :disabled="!isFormValid">Login</button>
   +     <button :disabled="disabled || !isFormValid">Login</button>
       </form>
     </template>

     <script>
     export default {
   +   props: {
   +     disabled: Boolean,
   +   },

       emits: ['submit'],
   ```

1. Add `isLoading` state in `src/pages/RegisterPage.vue`

   ```diff
     export default {
       components: {
         AuthCard,
         AuthButton,
         AuthSeparator,
         AuthFooter,
         RegisterForm,
       },

   +   data() {
   +     return {
   +       isLoading: false,
   +     };
   +   },

       methods: {
         async registerWithEmail(data) {
   +       this.isLoading = true;
           try {
             const credential = await auth.createUserWithEmailAndPassword(data.email, data.password);
             await credential.user.updateProfile({ displayName: data.name });
           } catch (error) {
             console.error(error);
           }
   +       this.isLoading = false;
         },

         async registerWithGoogle() {
   +       this.isLoading = true;
           try {
             const provider = new firebase.auth.GoogleAuthProvider();
             await auth.signInWithPopup(provider);
           } catch (error) {
             console.log(error);
           }
   +       this.isLoading = false;
         },
       },
     };
   ```

1. Disable `RegisterForm` and `AuthButton` in `src/pages/RegisterPage.vue` while loading

   ```diff
     <AuthCard>
       <img src="@assets/images/logo.png" alt="Instagram logo" />
       <p>Register to see photos and videos from your friends</p>

   -   <AuthButton filled @click="registerWithGoogle" />
   +   <AuthButton filled :disabled="isLoading" @click="registerWithGoogle" />
       <AuthSeparator />
   -   <RegisterForm @submit="registerWithEmail" />
   +   <RegisterForm :disabled="isLoading" @submit="registerWithEmail" />
     </AuthCard>
   ```

1. Accept `disabled` prop in `src/components/RegisterForm.vue`

   ```diff
     <template>
       <form @submit.prevent="submitForm">
   -     <input type="name" name="name" placeholder="Full name" v-model="name" required />
   -     <input type="email" name="email" placeholder="Email" v-model="email" required />
   -     <input type="password" name="password" placeholder="Password" v-model="password" required />
   +     <input type="name" name="name" placeholder="Full name" v-model="name" :disabled="disabled" required />
   +     <input type="email" name="email" placeholder="Email" v-model="email" :disabled="disabled" required />
   +     <input type="password" name="password" placeholder="Password" v-model="password" :disabled="disabled" required />

   -     <button :disabled="!isFormValid">Register</button>
   +     <button :disabled="disabled || !isFormValid">Register</button>
       </form>
     </template>

     <script>
     export default {
   +   props: {
   +     disabled: Boolean,
   +   },

       emits: ['submit'],
   ```

### Switch to completed branch for this step:

```bash
git checkout 12-add-loading-states
```

---

- [**Return to previous step**](11-add-navigation-guards.md)
- [**Proceed to next step**](13-add-error-handling.md)
