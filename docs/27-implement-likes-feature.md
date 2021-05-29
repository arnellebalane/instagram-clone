# Implement likes feature

1. Add `likePost` Cloud Function in `functions/index.js`

   ```js
   exports.likePost = functions.https.onCall((data, context) => {
     return db.runTransaction(async (t) => {
       const likeRef = db.doc(`users/${context.auth.uid}/likes/${data.postId}`);
       const postRef = db.doc(`posts/${data.postId}`);
       const post = await t.get(postRef);
       t.set(likeRef, {});
       t.update(postRef, {
         likesCount: post.data().likesCount + 1,
       });
     });
   });
   ```

1. Add `unlikePost` Cloud Function in `functions/index.js`

   ```js
   exports.unlikePost = functions.https.onCall((data, context) => {
     return db.runTransaction(async (t) => {
       const likeRef = db.doc(`users/${context.auth.uid}/likes/${data.postId}`);
       const postRef = db.doc(`posts/${data.postId}`);
       const post = await t.get(postRef);
       t.delete(likeRef);
       t.update(postRef, {
         likesCount: post.data().likesCount - 1,
       });
     });
   });
   ```

1. Implement `likePost` method in `src/components/Post.vue`

   ```diff
     <template>
       <article>
         <PostHeader :post="post" />
         <PostImage :post="post" />
   -     <PostActions :post="post" @like="likePost" @comment="startComment" @share="sharePost" />
   +     <PostActions :post="post" :liked="liked" @like="likePost" @comment="startComment" @share="sharePost" />
         <PostStats :post="post" />
         <PostComments :post="post" :comments="comments" />
         <PostDate :post="post" />
         <PostNewCommentForm :post="post" />
       </article>
     </template>

     <script>
   + import { functions } from '@lib/firebase';
     import PostHeader from '@components/PostHeader.vue';
     ...

       props: {
         post: {
           type: Object,
           required: true,
         },
         comments: {
           type: Array,
           required: true,
         },
   +     liked: Boolean,
       },

       methods: {
   -     likePost() {
   -       console.log('like');
   -     },
   +     async likePost() {
   +       this.$store.commit('clearError');
   +
   +       try {
   +         const functionName = this.liked ? 'unlikePost' : 'likePost';
   +         await functions.httpsCallable(functionName)({
   +           postId: this.post.id,
   +         });
   +       } catch (error) {
   +         console.error(error);
   +         this.$store.setError('Failed to like the post. Please try again.');
   +       }
   +     },
   ```

1. Add loading state for like/unlike post in `src/components/Post.vue`

   ```diff
     <template>
       <article>
         <PostHeader :post="post" />
         <PostImage :post="post" />
   -     <PostActions :post="post" :liked="liked" @like="likePost" @comment="startComment" @share="sharePost" />
   +     <PostActions :post="post" :liked="liked" :disabled="isLoading" @like="likePost" @comment="startComment" @share="sharePost" />
         <PostStats :post="post" />
         <PostComments :post="post" :comments="comments" />
         <PostDate :post="post" />
         <PostNewCommentForm :post="post" />
       </article>
     </template>
     ...

   +   data() {
   +     return {
   +       isLoading: false,
   +     };
   +   },

       methods: {
         async likePost() {
   +       this.isLoading = true;
           this.$store.commit('clearError');

           try {
             const functionName = this.liked ? 'unlikePost' : 'likePost';
             await functions.httpsCallable(functionName)({
               postId: this.post.id,
             });
           } catch (error) {
             console.error(error);
             this.$store.setError('Failed to like the post. Please try again.');
           }
   +       this.isLoading = false;
         },


   ```

1. Create `currentUserLikes` state in `src/lib/store.js`

   ```diff
     import { createStore } from 'vuex';

       const state = {
         currentUser: null,
   +     currentUserLikes: {},
         error: null,
       };
       ...

       const mutations = {
         setCurrentUser(state, user) {
           state.currentUser = user;
         },

   +     setCurrentUserLikes(state, likes) {
   +       state.currentUserLikes = likes.reduce((obj, like) => {
   +         obj[like.id] = true;
   +         return obj;
   +       }, {});
   +     },

         setError(state, message) {
           state.error = message;
         },

         clearError(state) {
           state.error = null;
         },
       };
   ```

1. Fetch current user's likes in `src/components/App.vue` and put them in the store

   ```diff
     <script>
     import { mapState, mapGetters } from 'vuex';
   + import { auth, db } from '@lib/firebase';
     import AppHeader from '@components/AppHeader.vue';
     import AppError from '@components/AppError.vue';

     export default {
       components: {
         AppHeader,
         AppError,
       },

       computed: {
   -     ...mapState(['error']),
   +     ...mapState(['currentUser', 'error']),
         ...mapGetters(['isLoggedIn', 'hasError']),
       },

   +   mounted() {
   +     auth.onAuthStateChanged((user) => {
   +       if (user) {
   +         this.unsubscribeLikes = db.collection(`users/${this.currentUser.uid}/likes`).onSnapshot((snapshot) => {
   +           const likes = snapshot.docs.map((doc) => ({ id: doc.id }));
   +           this.$store.commit('setCurrentUserLikes', likes);
   +         });
   +       } else if (this.unsubscribeLikes) {
   +         this.unsubscribeLikes();
   +       }
   +     });
   +   },
   +
   +   unmounted() {
   +     if (this.unsubscribeLikes) {
   +       this.unsubscribeLikes();
   +     }
   +   },
     };
     </script>
   ```

1. Update `firestore.rules` to allow read for likes data

   ```diff
     match /users/{user} {
       allow read: if request.auth != null;
       allow update: if validateUpdateUserRequest(user);

   +   match /likes/{like} {
   +     allow read;
   +   }
     }
   ```

1. Determine if post is liked or not in `src/components/Feed.vue`

   ```diff
     <template>
       <div v-if="hasPosts">
   -     <Post v-for="post in posts" :key="post.id" :post="post" :comments="post.latestComments" />
   +     <Post v-for="post in posts" :key="post.id" :post="post" :comments="post.latestComments" :liked="isLikedPosT(post)" />
       </div>
       <p v-else>No posts available</p>
     </template>

     <script>
   + import { mapState } from 'vuex';
     import Post from '@components/Post.vue';

     export default {
       components: {
         Post,
       },

       props: {
         posts: {
           type: Array,
           required: true,
         },
       },

       computed: {
   +     ...mapState(['currentUserLikes']),

         hasPosts() {
           return this.posts.length > 0;
         },
       },

   +   methods: {
   +     isLikedPost(post) {
   +       return post.id in this.currentUserLikes;
   +     },
   +   },
     };
     </script>
   ```

1. Determine if post is liked or not in `src/pages/PostPage.vue`

   ```diff
     <template>
       <div class="PostPage">
   -     <Post v-if="post" :post="post" :comments="comments" />
   +     <Post v-if="post" :post="post" :comments="comments" :liked="isLikedPost" />
       </div>
     </template>

     <script>
   + import { mapState } from 'vuex';
     import { db } from '@lib/firebase';
     import Post from '@components/Post.vue';

     export default {
       components: {
         Post,
       },

       data() {
         return {
           post: null,
           comments: [],
         };
       },

   +   computed: {
   +     ...mapState(['currentUserLikes']),
   +
   +     isLikedPost() {
   +       return this.post?.id in this.currentUserLikes;
   +     },
   +   },
   ```

### Switch to completed branch for this step:

```bash
git checkout 27-implement-likes-feature
```

---

- [**Return to previous step**](26-implement-comments-feature)
