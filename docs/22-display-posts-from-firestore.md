# Display posts from Firestore

1. Remove mock data from `src/pages/FeedPage.vue` (replace current contents)

   ```vue
   <template>
     <div class="FeedPage">
       <NewPostForm />
       <Feed :posts="posts" />
     </div>
   </template>

   <script>
   import NewPostForm from '@components/NewPostForm.vue';
   import Feed from '@components/Feed.vue';

   export default {
     components: {
       NewPostForm,
       Feed,
     },

     data() {
       return {
         posts: [],
       };
     },
   };
   </script>

   <style scoped>
   .NewPostForm {
     margin-bottom: 2.4rem;
   }
   </style>
   ```

1. Query posts data inside `mounted` lifecycle hook in `src/pages/FeedPage.vue`

   ```diff
     <script>
   + import { db } from '@lib/firebase';
     import NewPostForm from '@components/NewPostForm.vue';
     import Feed from '@components/Feed.vue';

     export default {
       components: {
         NewPostForm,
         Feed,
       },

       data() {
         return {
           posts: [],
         };
       },

   +   mounted() {
   +     db.collection('posts')
   +       .orderBy('datePosted', 'desc')
   +       .onSnapshot((snapshot) => {
   +         this.posts = snapshot.docs
   +           .filter((doc) => !doc.metadata.hasPendingWrites)
   +           .map((doc) => ({ ...doc.data(), id: doc.id }));
   +       });
   +   },
     };
     </script>
   ```

1. Unsubscribe from realtime data inside `unmounted` lifecycle hook in `src/pages/FeedPage.vue`

   ```diff
     mounted() {
   -   db.collection('posts')
   +   this.unsubscribePosts = db.collection('posts')
         .orderBy('datePosted', 'desc')
         .onSnapshot((snapshot) => {
           this.posts = snapshot.docs
             .filter((doc) => !doc.metadata.hasPendingWrites)
             .map((doc) => ({ ...doc.data(), id: doc.id }));
         });
     },

   + unmounted() {
   +   this.unsubscribePosts();
   + },
   ```

### Switch to completed branch for this step:

```bash
git checkout 22-display-posts-from-firestore
```

---

- [**Return to previous step**](21-implement-feed-and-post-components.md)
- [**Proceed to next step**](23-implement-profile-page-ui.md)
