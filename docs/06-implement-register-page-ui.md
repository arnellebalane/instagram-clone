# Implement RegisterPage UI

1. Create `src/components/RegisterForm.vue`

   ```vue
   <template>
     <form @submit.prevent="submitForm">
       <input type="name" name="name" placeholder="Full name" v-model="name" required />
       <input type="email" name="email" placeholder="Email" v-model="email" required />
       <input type="password" name="password" placeholder="Password" v-model="password" required />

       <button :disabled="!isFormValid">Register</button>
     </form>
   </template>

   <script>
   export default {
     emits: ['submit'],

     data() {
       return {
         name: '',
         email: '',
         password: '',
       };
     },

     computed: {
       isFormValid() {
         return this.name.length > 0 && this.email.length > 0 && this.password.length > 0;
       },
     },

     methods: {
       submitForm() {
         this.$emit('submit', {
           name: this.name,
           email: this.email,
           password: this.password,
         });
       },
     },
   };
   </script>

   <style scoped>
   @import '@styles/auth-form.css';
   </style>
   ```

1. Use the components we just created in `src/pages/RegisterPage.vue` (replace current contents)

   ```vue
   <template>
     <div class="AuthPage">
       <AuthCard>
         <img src="@assets/images/logo.png" alt="Instagram logo" />
         <p>Register to see photos and videos from your friends</p>

         <AuthButton @click="registerWithGoogle" />
         <AuthSeparator />
         <RegisterForm @submit="registerWithEmail" />
       </AuthCard>

       <AuthFooter>
         <p>
           Have an account?
           <RouterLink :to="{ name: 'login' }">Login</RouterLink>
         </p>
       </AuthFooter>
     </div>
   </template>

   <script>
   import AuthCard from '@components/AuthCard.vue';
   import AuthButton from '@components/AuthButton.vue';
   import AuthSeparator from '@components/AuthSeparator.vue';
   import AuthFooter from '@components/AuthFooter.vue';
   import RegisterForm from '@components/RegisterForm.vue';

   export default {
     components: {
       AuthCard,
       AuthButton,
       AuthSeparator,
       AuthFooter,
       RegisterForm,
     },

     methods: {
       registerWithEmail(data) {
         console.log(data);
       },

       registerWithGoogle() {
         console.log('register with google');
       },
     },
   };
   </script>

   <style scoped>
   @import '@styles/auth.css';

   .AuthCard p {
     font-size: 1.6rem;
     font-weight: 700;
     text-align: center;
     color: var(--gray-500);
   }
   </style>
   ```

1. Add `filled` variation for `src/components/AuthButton.vue`

   - Accept `filled` prop

     ```diff
     + <script>
     + export default {
     +   props: {
     +     filled: Boolean,
     +   },
     + };
     + </script>
     ```

   - Add `filled` class if `filled` prop is `true`

     ```diff
       <template>
     -   <button v-bind="$attrs">
     +   <button :class="{ filled }" v-bind="$attrs">
     ```

   - Add styles for filled `AuthButton`

     ```diff
     + button.filled {
     +   color: var(--white);
     +   background-color: var(--primary);
     + }

       svg {
         width: 1.4rem;
       }
       </style>
     ```

1. Use filled `AuthButton` in `src/pages/RegisterPage.vue`

   ```diff
   -       <AuthButton @click="registerWithGoogle" />
   +       <AuthButton filled @click="registerWithGoogle" />
   ```

### Switch to completed branch for this step:

```bash
git checkout 06-implement-register-page-ui
```

---

- [**Return to previous step**](05-implement-login-page-ui.md)
- [**Proceed to next step**](07-initialize-firebase-project.md)
