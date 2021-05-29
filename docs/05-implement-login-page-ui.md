# Implement LoginPage UI

1. Create `src/components/AuthCard.vue`

   ```vue
   <template>
     <div class="AuthCard">
       <slot></slot>
     </div>
   </template>

   <style scoped>
   div {
     display: flex;
     flex-direction: column;
     gap: 2rem;

     width: 100%;
     max-width: 36rem;
     padding: 3.6rem;
     border: 1px solid var(--gray-200);
     background-color: var(--white);
   }
   </style>
   ```

1. Create `src/components/LoginForm.vue`

   ```vue
   <template>
     <form @submit.prevent="submitForm">
       <input type="email" name="email" placeholder="Email" v-model="email" required />
       <input type="password" name="password" placeholder="Password" v-model="password" required />

       <button :disabled="!isFormValid">Login</button>
     </form>
   </template>

   <script>
   export default {
     emits: ['submit'],

     data() {
       return {
         email: '',
         password: '',
       };
     },

     computed: {
       isFormValid() {
         return this.email.length > 0 && this.password.length > 0;
       },
     },

     methods: {
       submitForm() {
         this.$emit('submit', {
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

1. Create `src/styles/auth-form.css`

   ```css
   form {
     display: flex;
     flex-direction: column;
     gap: 6px;
   }

   input {
     padding: 1rem;
     border: 1px solid var(--gray-200);
     border-radius: 4px;
     font-size: 1.2rem;
     background-color: var(--gray-50);
   }

   button {
     padding: 8px 1.6rem;
     border: none;
     border-radius: 4px;
     margin-top: 8px;
     font-weight: 700;
     color: var(--white);
     background-color: var(--primary);
     cursor: pointer;
   }
   ```

1. Create `src/components/AuthSeparator.vue`

   ```vue
   <template>
     <p>or</p>
   </template>

   <style scoped>
   p {
     position: relative;
     font-weight: 700;
     text-align: center;
     text-transform: uppercase;
     color: var(--gray-400);
   }

   p::before,
   p::after {
     content: '';
     position: absolute;
     top: 50%;
     width: 40%;
     border-top: 1px solid var(--gray-300);
   }

   p::before {
     left: 0;
   }

   p::after {
     right: 0;
   }
   </style>
   ```

1. Create `src/components/AuthButton.vue`

   ```vue
   <template>
     <button v-bind="$attrs">
       <svg viewBox="0 0 24 24">
         <path
           fill="currentColor"
           stroke="currentColor"
           stroke-width="1"
           d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
         />
       </svg>

       Login with Google
     </button>
   </template>

   <style scoped>
   button {
     display: flex;
     justify-content: center;
     align-items: center;
     gap: 8px;

     padding: 8px 1.6rem;
     border: none;
     border-radius: 4px;
     font-weight: 700;
     color: var(--gray-700);
     background: none;
     cursor: pointer;
   }

   svg {
     width: 1.4rem;
   }
   </style>
   ```

1. Create `src/components/AuthFooter.vue`

   ```vue
   <template>
     <footer class="AuthFooter">
       <slot></slot>
     </footer>
   </template>

   <style scoped>
   footer {
     width: 100%;
     max-width: 36rem;
     padding: 2.4rem 3.6rem;
     border: 1px solid var(--gray-200);
     text-align: center;
     background-color: var(--white);
   }
   </style>
   ```

1. Place icons, images, and other assets inside `src/assets`.

   - Normally, you would generate or download your assets yourself, but for this demo they're already provided inside the `docs` directory.

     ```bash
     cp -r docs/assets src
     ```

1. Use the components we just created in `src/pages/LoginPage.vue` (replace current contents)

   ```vue
   <template>
     <div class="AuthPage">
       <AuthCard>
         <img src="@assets/images/logo.png" alt="Instagram logo" />

         <LoginForm @submit="loginWithEmail" />
         <AuthSeparator />
         <AuthButton @click="loginWithGoogle" />
       </AuthCard>

       <AuthFooter>
         <p>
           Don't have an account?
           <RouterLink :to="{ name: 'register' }">Register</RouterLink>
         </p>
       </AuthFooter>
     </div>
   </template>

   <script>
   import AuthCard from '@components/AuthCard.vue';
   import AuthSeparator from '@components/AuthSeparator.vue';
   import AuthButton from '@components/AuthButton.vue';
   import AuthFooter from '@components/AuthFooter.vue';
   import LoginForm from '@components/LoginForm.vue';

   export default {
     components: {
       LoginForm,
       AuthCard,
       AuthSeparator,
       AuthButton,
       AuthFooter,
     },

     methods: {
       loginWithEmail(data) {
         console.log(data);
       },

       loginWithGoogle() {
         console.log('login with google');
       },
     },
   };
   </script>

   <style scoped>
   @import '@styles/auth.css';

   img {
     margin-bottom: 1.6rem;
   }
   </style>
   ```

1. Create `src/styles/auth.css`

   ```css
   .AuthPage {
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     padding-bottom: 20rem;
   }

   img {
     display: block;
     width: 65%;
     margin: 0 auto;
   }

   .AuthFooter {
     margin-top: 1rem;
   }

   .AuthFooter a {
     font-weight: 700;
     color: var(--primary);
   }
   ```

1. Make the current page occupy entire page height (`src/components/App.vue`)

   ```diff
     <template>
       <div class="Wrapper">
   -     <RouterView />
   +     <RouterView class="Page" />
       </div>
     </template>

     <style scoped>
     .Wrapper {
       display: flex;
       flex-direction: column;

       max-width: 54rem;
       min-height: 100vh;
       padding: 7.4rem 2.4rem;
       margin: 0 auto;
     }

   + .Page {
   +   flex-grow: 1;
   + }
     </style>
   ```

1. Move `src/index.css` inside `styles` directory

   ```bash
   mv src/index.css src/styles
   ```

   - Update `index.html`

     ```diff
     - <link rel="stylesheet" href="./src/index.css" />
     + <link rel="stylesheet" href="./src/styles/index.css" />
     ```

### Switch to completed branch for this step:

```bash
git checkout 05-implement-login-page-ui
```

---

- [**Return to previous step**](04-setup-routing.md)
- [**Proceed to next step**](06-implement-register-page-ui.md)
