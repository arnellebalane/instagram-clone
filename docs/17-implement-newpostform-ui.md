# Implement NewPostForm UI

1. Create `src/components/FilePicker.vue`

   ```vue
   <template>
     <div>
       <button v-if="file" type="button" :disabled="disabled" @click="clearFile">Clear</button>
       <label v-else>
         <input type="file" name="file" accept="image/*" :disabled="disabled" @change="selectFile" />
       </label>
     </div>
   </template>

   <script>
   export default {
     props: {
       disabled: Boolean,
     },

     emits: ['change'],

     data() {
       return {
         file: null,
       };
     },

     watch: {
       file(value) {
         this.$emit('change', value);
       },
     },

     methods: {
       clearFile() {
         this.file = null;
       },

       selectFile(event) {
         this.file = event.target.files[0];
       },
     },
   };
   </script>

   <style scoped>
   label,
   button {
     display: block;
     width: 3.2rem;
     height: 3.2rem;
     border-radius: 4px;
     background: var(--gray-100) center center no-repeat;
     background-size: 1.8rem;
     cursor: pointer;
   }

   label:focus-within,
   button:focus {
     background-color: var(--gray-200);
   }

   label {
     position: relative;
     background-image: url('@assets/icons/image.svg');
   }

   button {
     border: none;
     font-size: 0;
     background-image: url('@assets/icons/close.svg');
   }

   input[type='file'] {
     position: absolute;
     opacity: 0;
     transform: scale(0);
   }
   </style>
   ```

1. Create `src/components/NewPostForm.vue`

   ```vue
   <template>
     <form class="NewPostForm" @submit.prevent="submitForm">
       <img class="Avatar" :src="currentUserPhotoURL" :alt="currentUser?.displayName" />

       <div class="Fields">
         <input type="text" name="caption" placeholder="Add a caption..." v-model="caption" required />
         <FilePicker ref="filePicker" @change="selectFile" />
         <button :disabled="!isFormValid">Post</button>
       </div>
     </form>
   </template>

   <script>
   import { mapState } from 'vuex';
   import FilePicker from '@components/FilePicker.vue';
   import defaultPhoto from '@assets/images/default-photo.jpg';

   export default {
     components: {
       FilePicker,
     },

     data() {
       return {
         file: null,
         caption: '',
       };
     },

     computed: {
       ...mapState(['currentUser']),

       currentUserPhotoURL() {
         return this.currentUser?.photoURL || defaultPhoto;
       },

       isFormValid() {
         return this.file && this.caption.length > 0;
       },
     },

     methods: {
       selectFile(file) {
         this.file = file;
         if (!file) {
           this.caption = '';
         }
       },

       clearForm() {
         this.$refs.filePicker.clearFile();
       },

       submitForm() {
         console.log(this.caption, this.file);
       },
     },
   };
   </script>

   <style scoped>
   form {
     display: grid;
     grid-template-columns: max-content 1fr;
     grid-template-areas: '. .' 'preview preview';
     column-gap: 8px;
     row-gap: 1.6rem;

     padding: 1.6rem;
     padding-bottom: 0;
     border: 1px solid var(--gray-200);
     background-color: var(--white);
   }

   .Avatar {
     width: 3.2rem;
     height: 3.2rem;
     object-fit: cover;
     object-position: center center;
     border: 1px solid var(--gray-300);
     border-radius: 50%;
   }

   .Fields {
     display: flex;
     gap: 8px;
   }

   input[type='text'] {
     flex-grow: 1;
     width: 0;
     padding: 8px;
     border: none;
     line-height: 1.6rem;
     resize: none;
   }

   button {
     padding: 0 1.2rem;
     border: none;
     border-radius: 4px;
     font-weight: 700;
     line-height: 3.2rem;
     color: var(--white);
     background-color: var(--primary);
     cursor: pointer;
   }
   </style>
   ```

1. Render `NewPostForm` in `src/pages/FeedPage.vue` (replace current contents)

   ```vue
   <template>
     <div class="FeedPage">
       <NewPostForm />
     </div>
   </template>

   <script>
   import NewPostForm from '@components/NewPostForm.vue';

   export default {
     components: {
       NewPostForm,
     },
   };
   </script>

   <style scoped>
   .NewPostForm {
     margin-bottom: 2.4rem;
   }
   </style>
   ```

1. Add selected image preview in `src/pages/NewPostForm.vue`

   ```diff
     <template>
       ...

   +     <img class="Preview" :src="filePreviewURL" alt="" />
       </form>
     </template>

     <script>
     ...
       computed: {
         ...
   +     filePreviewURL() {
   +       return this.file ? URL.createObjectURL(this.file) : null;
   +     },
       },
     </script>

     <style scoped>
     ...
   + .Preview {
   +   grid-area: preview;
   +   display: block;
   +   width: calc(100% + 3.2rem);
   +   margin: 0 -1.6rem;
   + }
     </style>
   ```

### Switch to completed branch for this step:

```bash
git checkout 17-implement-newpostform-ui
```

---

- [**Return to previous step**](16-setup-firebase-emulators-suite.md)
- [**Proceed to next step**](18-save-post-to-firestore.md)
