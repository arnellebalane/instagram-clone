# Display profile from Firestore

1. Remove mock data from `src/pages/ProfilePage.vue` (replace current contents)

   ```vue
   <template>
     <div class="ProfilePage">
       <ProfileHeader :user="user" />
       <ProfileStats :user="user" />
       <ImageGrid :posts="posts" />
     </div>
   </template>

   <script>
   import ProfileHeader from '@components/ProfileHeader.vue';
   import ProfileStats from '@components/ProfileStats.vue';
   import ImageGrid from '@components/ImageGrid.vue';

   export default {
     components: {
       ProfileHeader,
       ProfileStats,
       ImageGrid,
     },

     data() {
       return {
         user: null,
         posts: [],
       };
     },
   };
   </script>

   <style scoped>
   .ProfilePage {
     display: flex;
     flex-direction: column;
     gap: 2.4rem;
   }
   </style>
   ```

1. Query user and posts data inside `mounted` lifecycle hook in `src/pages/ProfilePage.vue`

   ```diff
     <template>
       <div class="ProfilePage">
   -     <ProfileHeader :user="user" />
   -     <ProfileStats :user="user" />
   +     <template v-if="user">
   +       <ProfileHeader :user="user" />
   +       <ProfileStats :user="user" />
   +     </template>
         <ImageGrid :posts="posts" />
       </div>
     </template>

     <script>
   + import { db } from '@lib/firebase';
     import ProfileHeader from '@components/ProfileHeader.vue';
     import ProfileStats from '@components/ProfileStats.vue';
     import ImageGrid from '@components/ImageGrid.vue';

     export default {
       components: {
         ProfileHeader,
         ProfileStats,
         ImageGrid,
       },

       data() {
         return {
           user: null,
           posts: [],
         };
       },

   +   mounted() {
   +     const userId = this.$route.params.id;
   +
   +     db.doc(`users/${userId}`).onSnapshot((doc) => {
   +       if (doc.exists) {
   +         this.user = { ...doc.data(), id: doc.id };
   +       } else {
   +         this.$router.push({ name: 'not-found' });
   +       }
   +     });
   +
   +     db.collection('posts')
   +       .where('author.id', '==', userId)
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

1. Unsubscribe from realtime updates inside `unmounted` lifecycle hook in `src/pages/ProfilePage.vue`

   ```diff
     mounted() {
       const userId = this.$route.params.id;

   -   db.doc(`users/${userId}`).onSnapshot((doc) => {
   +   this.unsubscribeUser = db.doc(`users/${userId}`).onSnapshot((doc) => {
         if (doc.exists) {
           this.user = { ...doc.data(), id: doc.id };
         } else {
           this.$router.push({ name: 'not-found' });
         }
       });

   -   db.collection('posts')
   +   this.unsubscribePosts = db.collection('posts')
         .where('author.id', '==', userId)
         .orderBy('datePosted', 'desc')
         .onSnapshot((snapshot) => {
           this.posts = snapshot.docs
             .filter((doc) => !doc.metadata.hasPendingWrites)
             .map((doc) => ({ ...doc.data(), id: doc.id }));
         });
     },

   + unmounted() {
   +   this.unsubscribeUser();
   +   this.unsubscribePosts();
   + },
   ```

### Switch to completed branch for this step:

```bash
git checkout 24-display-profile-from-firestore
```

---

- [**Return to previous step**](23-implement-profile-page-ui.md)
- [**Proceed to next step**](25-display-post-page-from-firestore.md)
