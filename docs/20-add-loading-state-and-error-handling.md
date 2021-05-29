# Add loading state and error handling

1. Add `isLoading` state to `src/components/NewPostForm.vue`

   ```diff
     export default {
       components: {
         FilePicker,
       },

       data() {
         return {
           file: null,
           caption: '',
   +       isLoading: false,
         };
       },

       computed: {
   ```

1. Set/clear `isLoading` and `error` states inside `submitForm` method in `src/components/NewPostForm.vue`

   ```diff
     async submitForm() {
   +   this.isLoading = true;
   +   this.$store.commit('clearError');

       const [successfulUploadPhoto, photoRef] = await this.uploadPhoto(this.file);
       if (!successfulUploadPhoto) {
         console.error(photoRef);
   +     this.$store.commit('setError', 'Failed to upload photo. Please try again.');
   +     this.isLoading = false;
         return;
       }

       const postData = {
         caption: this.caption,
         photoURL: await photoRef.getDownloadURL(),
       };
       const [successfulCreatePost, postRef] = await this.createPost(postData);
       if (!successfulCreatePost) {
         console.error(postRef);
         await this.deletePhoto(photoRef);
   +     this.$store.commit('setError', 'Failed to save post. Please try again.');
   +     this.isLoading = false;
         return;
       }

       this.clearForm();
   +   this.isLoading = false;
     },
   ```

1. Disable template elements in `src/components/NewPostForm.vue`

   ```diff
     <template>
       <form class="NewPostForm" @submit.prevent="submitForm">
         <img class="Avatar" :src="currentUserPhotoURL" :alt="currentUser?.displayName" />

         <div class="Fields">
   -       <input type="text" name="caption" placeholder="Add a caption..." v-model="caption" required />
   -       <FilePicker ref="filePicker" @change="selectFile" />
   -       <button :disabled="!isFormValid">Post</button>
   +       <input type="text" name="caption" placeholder="Add a caption..." :disabled="isLoading" v-model="caption" required />
   +       <FilePicker ref="filePicker" :disabled="isLoading" @change="selectFile" />
   +       <button :disabled="isLoading || !isFormValid">Post</button>
         </div>

         <img class="Preview" :src="filePreviewURL" alt="" />
       </form>
     </template>
   ```

### Switch to completed branch for this step:

```bash
git checkout 20-add-loading-state-and-error-handling
```

---

- [**Return to previous step**](19-secure-data-with-security-rules.md)
- [**Proceed to next step**](21-implement-feed-and-post-components.md)
