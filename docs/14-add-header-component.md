# Add Header component

1. Create `src/components/AppHeader.vue`

   ```vue
   <template>
     <header class="AppHeader">
       <div class="Wrapper">
         <RouterLink to="/feed">
           <img src="@assets/images/logo.png" alt="Instagram logo" />
         </RouterLink>

         <UserMenu />
       </div>
     </header>
   </template>

   <script>
   import UserMenu from '@components/UserMenu.vue';

   export default {
     components: {
       UserMenu,
     },
   };
   </script>

   <style scoped>
   header {
     border-bottom: 1px solid var(--gray-200);
     background-color: var(--white);
   }

   .Wrapper {
     display: flex;
     justify-content: space-between;
     align-items: center;
     max-width: 54rem;
     height: 5rem;
     padding: 0 2.4rem;
     margin: 0 auto;
   }

   img {
     display: block;
     height: 2.8rem;
     margin-top: 8px;
   }
   </style>
   ```

1. Create `src/components/UserMenu.vue`

   ```vue
   <template>
     <div class="UserMenu">
       <button :class="{ open: isOpen }" @click.stop="toggleDropdown">
         <img :src="currentUserPhotoURL" :alt="currentUser?.displayName" />
       </button>

       <UserDropdown v-model="isOpen" :user="currentUser" @logout="logout" />
     </div>
   </template>

   <script>
   import { mapState } from 'vuex';
   import { auth } from '@lib/firebase';
   import UserDropdown from '@components/UserDropdown.vue';
   import defaultPhoto from '@assets/images/default-photo.jpg';

   export default {
     components: {
       UserDropdown,
     },

     data() {
       return {
         isOpen: false,
       };
     },

     computed: {
       ...mapState(['currentUser']),

       currentUserPhotoURL() {
         return this.currentUser?.photoURL || defaultPhoto;
       },
     },

     methods: {
       toggleDropdown() {
         this.isOpen = !this.isOpen;
       },

       logout() {
         auth.signOut();
       },
     },
   };
   </script>

   <style scoped>
   div {
     position: relative;
   }

   .UserDropdown {
     position: absolute;
     top: calc(100% + 1.2rem);
     right: -1.2rem;
   }

   button {
     width: 2.4rem;
     height: 2.4rem;
     padding: 0;
     border: none;
     border-radius: 50%;
     background: none;
   }

   button.open {
     box-shadow: 0 0 0 1px var(--white), 0 0 0 2px var(--gray-500);
   }

   img {
     display: block;
     width: 100%;
     height: 100%;
     object-fit: cover;
     object-position: center center;
     border: 1px solid var(--gray-300);
     border-radius: 50%;
     cursor: pointer;
   }
   </style>
   ```

1. Create `src/components/UserDropdown.vue`

   ```vue
   <template>
     <ul class="UserDropdown" :class="{ open: modelValue }">
       <li>
         <span>{{ user.displayName }}</span>
       </li>
       <li>
         <RouterLink :to="{ name: 'profile', params: { id: user.uid } }"> Profile </RouterLink>
       </li>
       <li>
         <button @click="logout">Logout</button>
       </li>
     </ul>
   </template>

   <script>
   export default {
     props: {
       modelValue: Boolean,
       user: {
         type: Object,
         required: true,
       },
     },

     emits: ['logout', 'update:modelValue'],

     watch: {
       modelValue(value) {
         if (value) {
           document.addEventListener('click', this.handleClick);
         } else {
           document.removeEventListener('click', this.handleClick);
         }
       },
     },

     methods: {
       handleClick(event) {
         const isOutsideDropdown = !event.target.closest('.UserDropdown');
         const isLinkInsideDropdown = event.target.closest('.UserDropdown a');

         if (isOutsideDropdown || isLinkInsideDropdown) {
           this.$emit('update:modelValue', false);
         }
       },

       logout() {
         this.$emit('logout');
       },
     },
   };
   </script>

   <style scoped>
   ul {
     width: 18rem;
     padding: 0;
     border-radius: 4px;

     list-style: none;
     background-color: var(--white);
     box-shadow: 0 0 8px var(--gray-300);
   }

   ul:not(.open) {
     display: none;
   }

   ul::before {
     content: '';
     position: absolute;
     top: 0;
     right: 1.8rem;
     width: 1.2rem;
     height: 1.2rem;
     background-color: var(--white);
     box-shadow: 1px -1px 1px var(--gray-200);
     transform: translateY(-5px) rotate(-45deg);
     transform-origin: center center;
   }

   li span,
   li a,
   li button {
     display: block;
     width: 100%;
     padding: 8px 1.6rem;
     text-align: left;
   }

   li span {
     border-bottom: 1px solid var(--gray-100);
     font-weight: 700;
   }

   li button {
     border: none;
     background: none;
     cursor: pointer;
   }

   li a:hover,
   li a:focus,
   li button:hover,
   li button:focus {
     background-color: var(--gray-50);
   }

   li:last-child > * {
     border-radius: 0 0 4px 4px;
   }
   </style>
   ```

1. Render `AppHeader` in `src/components/App.vue`, only when a user is logged in

   ```diff
     <template>
   +   <AppHeader v-if="isLoggedIn" />
       <AppError v-if="hasError">{{ error }}</AppError>

       <div class="Wrapper">
         <RouterView class="Page" />
       </div>
     </template>

     <script>
     import { mapState, mapGetters } from 'vuex';
   + import AppHeader from '@components/AppHeader.vue';
     import AppError from '@components/AppError.vue';

     export default {
       components: {
   +     AppHeader,
         AppError,
       },

       computed: {
         ...mapState(['error']),
   -     ...mapGetters(['hasError']),
   +     ...mapGetters(['isLoggedIn', 'hasError']),
       },
     };
     </script>

     <style scoped>
     ...

   + .AppHeader {
   +   position: fixed;
   +   top: 0;
   +   left: 0;
   +   z-index: 10;
   +   width: 100%;
   + }

     .AppError {
   ```

### Switch to completed branch for this step:

```bash
git checkout 14-add-header-component
```

---

- [**Return to previous step**](13-add-error-handling.md)
- [**Proceed to next step**](15-create-user-profiles.md)
