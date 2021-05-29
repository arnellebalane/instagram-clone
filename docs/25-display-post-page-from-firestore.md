# Display PostPage from Firestore

1. Fetch post data and comments in `src/pages/PostPage.vue` (replace current contents)

   ```vue
   <template>
     <div class="PostPage">
       <h1>PostPage</h1>
     </div>
   </template>

   <script>
   import { db } from '@lib/firebase';

   export default {
     data() {
       return {
         post: null,
         comments: [],
       };
     },

     mounted() {
       const postId = this.$route.params.id;

       this.unsubscribePost = db.doc(`posts/${postId}`).onSnapshot((doc) => {
         if (doc.exists) {
           this.post = { ...doc.data(), id: doc.id };
         } else {
           this.$router.push({ name: 'not-found' });
         }
       });

       this.unsubscribeComments = db
         .collection(`posts/${postId}/comments`)
         .orderBy('datePosted', 'asc')
         .onSnapshot((snapshot) => {
           this.comments = snapshot.docs
             .filter((doc) => !doc.metadata.hasPendingWrites)
             .map((doc) => ({ ...doc.data(), id: doc.id }));
         });
     },

     unmounted() {
       this.unsubscribePost();
       this.unsubscribeComments();
     },
   };
   </script>
   ```

1. Render `Post` component in `src/pages/PostPage.vue`

   ```diff
     <template>
       <div class="PostPage">
   -     <h1>PostPage</h1>
   +     <Post v-if="post" :post="post" />
       </div>
     </template>

     <script>
     import { db } from '@lib/firebase';
   + import Post from '@components/Post.vue';

     export default {
   +   components: {
   +     Post,
   +   },

       data() {
         return {
           post: null,
           comments: [],
         };
       },
   ```

1. Update `firebase.rules` to allow reads for comments data

   ```diff
     match /posts/{post} {
       allow read: if request.auth != null;
       allow create: if validateCreatePostRequest();

   +   match /comments/{comment} {
   +     allow read;
   +   }
     }
   ```

### Switch to completed branch for this step:

```bash
git checkout 25-display-post-page-from-firestore
```

---

- [**Return to previous step**](24-display-profile-from-firestore.md)
- [**Proceed to next step**](26-implement-comments-feature.md)
