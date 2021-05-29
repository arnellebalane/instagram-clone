# Add error handling

1. Add `error` state in `src/lib/store.js`

   ```diff
     const state = {
       currentUser: null,
   +   error: null,
     };

     const getters = {
       isLoggedIn(state) {
         return state.currentUser !== null;
       },

   +   hasError(state) {
   +     return state.error !== null;
   +   },
     };

     const mutations = {
       setCurrentUser(state, user) {
         state.currentUser = user;
       },

   +   setError(state, message) {
   +     state.error = message;
   +   },
   +
   +   clearError(state) {
   +     state.error = null;
   +   },
     };
   ```

1. Create `src/components/AppError.vue`

   ```vue
   <template>
     <p class="AppError">
       <slot></slot>
     </p>
   </template>

   <style scoped>
   p {
     max-width: 36rem;
     padding: 8px 1.6rem;
     border-radius: 4px;

     font-weight: 700;
     text-align: center;
     color: var(--white);
     background-color: var(--danger);
   }
   </style>
   ```

1. Render `AppError` in `src/components/App.vue`

   ```diff
       <template>
   +     <AppError v-if="hasError">{{ error }}</AppError>

         <div class="Wrapper">
           <RouterView class="Page" />
         </div>
       </template>

   +   <script>
   +   import { mapState, mapGetters } from 'vuex';
   +   import AppError from '@components/AppError.vue';
   +
   +   export default {
   +     components: {
   +       AppError,
   +     },
   +
   +     computed: {
   +       ...mapState(['error']),
   +       ...mapGetters(['hasError']),
   +     },
   +   };
   +   </script>

       <style scoped>
       .Wrapper {
         display: flex;
         flex-direction: column;

         max-width: 54rem;
         min-height: 100vh;
         padding: 7.4rem 2.4rem;
         margin: 0 auto;
       }

   +   .AppError {
   +     position: fixed;
   +     top: 3.2rem;
   +     left: 50%;
   +     z-index: 11;
   +     transform: translateX(-50%);
   +   }

       .Page {
         flex-grow: 1;
       }
       </style>
   ```

1. Handle errors in `src/pages/LoginPage.vue`

   ```diff
     methods: {
       async loginWithEmail(data) {
         this.isLoading = true;
   +     this.$store.commit('clearError');
         try {
           await auth.signInWithEmailAndPassword(data.email, data.password);
         } catch (error) {
           console.error(error);
   +       this.$store.commit('setError', error.message);
         }
         this.isLoading = false;
       },

       async loginWithGoogle() {
         this.isLoading = true;
   +     this.$store.commit('clearError');
         try {
           const provider = new firebase.auth.GoogleAuthProvider();
           await auth.signInWithPopup(provider);
         } catch (error) {
           console.error(error);
   +       this.$store.commit('setError', error.message);
         }
         this.isLoading = false;
       },
      },
   ```

1. Handle errors in `src/pages/RegisterPage.vue`

   ```diff
     methods: {
       async registerWithEmail(data) {
         this.isLoading = true;
   +     this.$store.commit('clearError');
         try {
           const credential = await auth.createUserWithEmailAndPassword(data.email, data.password);
           await credential.user.updateProfile({ displayName: data.name });
         } catch (error) {
           console.error(error);
   +       this.$store.commit('setError', error.message);
         }
         this.isLoading = false;
       },

       async registerWithGoogle() {
         this.isLoading = true;
   +     this.$store.commit('clearError');
         try {
           const provider = new firebase.auth.GoogleAuthProvider();
           await auth.signInWithPopup(provider);
         } catch (error) {
           console.log(error);
   +       this.$store.commit('setError', error.message);
         }
         this.isLoading = false;
       },
     },
   ```

### Switch to completed branch for this step:

```bash
git checkout 13-add-error-handling
```

---

- [**Return to previous step**](12-add-loading-states.md)
- [**Proceed to next step**](14-add-header-component.md)
