# Implement comments feature

1. Add `createComment` Cloud Function in `functions/index.js`

   ```js
   exports.createComment = functions.https.onCall((data, context) => {
     return db.runTransaction(async (t) => {
       const postRef = db.doc(`posts/${data.postId}`);
       const commentRef = postRef.collection('comments').doc();
       const comment = {
         body: data.body,
         datePosted: new Date(),
         author: {
           id: context.auth.uid,
           displayName: context.auth.token.name,
         },
       };
       const post = await t.get(postRef);
       t.set(commentRef, comment);
       t.update(postRef, {
         commentsCount: post.data().commentsCount + 1,
         latestComments: post.data().latestComments.concat(comment).slice(-2),
       });
     });
   });
   ```

1. Call Cloud Function inside `submitForm` in `src/components/PostNewCommentForm.vue`

   ```diff
     <script>
     import { mapState } from 'vuex';
   + import { functions } from '@lib/firebase';
     import defaultPhoto from '@assets/images/default-photo.jpg';
     ...

         async submitForm() {
           this.isLoading = true;
           this.$store.commit('clearError');

           try {
   -         // TODO: Save comment to Firestore
   -         console.log({ body: this.comment });
   +         await functions.httpsCallable('createComment')({
   +           postId: this.post.id,
   +           body: this.comment,
   +         });
             this.clearForm();
           } catch (error) {
             console.error(error);
             this.$store.commit('setError', 'Failed to save comment. Please try again.');
           }

           this.isLoading = false;
         },
   ```

1. Make `src/components/Post.vue` accept `comments` prop

   ```diff
     <template>
       <article>
         <PostHeader :post="post" />
         <PostImage :post="post" />
         <PostActions :post="post" @like="likePost" @comment="startComment" @share="sharePost" />
         <PostStats :post="post" />
   -     <PostComments :post="post" />
   +     <PostComments :post="post" :comments="comments" />
         <PostDate :post="post" />
         <PostNewCommentForm :post="post" />
       </article>
     </template>

     <script>
     import PostHeader from '@components/PostHeader.vue';
     import PostImage from '@components/PostImage.vue';
     import PostActions from '@components/PostActions.vue';
     import PostStats from '@components/PostStats.vue';
     import PostComments from '@components/PostComments.vue';
     import PostDate from '@components/PostDate.vue';
     import PostNewCommentForm from '@components/PostNewCommentForm.vue';

     export default {
       components: {
         PostHeader,
         PostImage,
         PostActions,
         PostStats,
         PostComments,
         PostDate,
         PostNewCommentForm,
       },

       props: {
         post: {
           type: Object,
           required: true,
         },
   +     comments: {
   +       type: Array,
   +       required: true,
   +     },
       },
   ```

1. Make `src/components/PostComments.vue` accept `comments` prop

   ```diff
     <template>
       <div class="PostComments">
         <p>
           <RouterLink class="AuthorName" :to="{ name: 'profile', params: { id: post.author.id } }">
             {{ post.author.displayName }}
           </RouterLink>
           {{ post.caption }}
         </p>

         <RouterLink class="ViewAllComments" v-if="hasMoreComments" :to="{ name: 'post', params: { id: post.id } }">
           View all {{ post.commentsCount }} comments
         </RouterLink>

   -     <p v-for="comment in post.latestComments" :key="comment.id">
   +     <p v-for="comment in comments" :key="comment.id">
           <RouterLink class="AuthorName" :to="{ name: 'profile', params: { id: comment.author.id } }">
             {{ comment.author.displayName }}
           </RouterLink>
           {{ comment.body }}
         </p>
       </div>
     </template>

     <script>
     export default {
       props: {
         post: {
           type: Object,
           required: true,
         },
   +     comments: {
   +       type: Array,
   +       required: true,
   +     },
       },

       computed: {
         hasMoreComments() {
   -       return this.post.commentsCount > this.post.latestComments.length;
   +       return this.post.commentsCount > this.comments.length;
         },
       },
     };
     </script>
   ```

1. Pass the appropriate `comments` prop from `src/components/Feed.vue`

   ```diff
     <template>
       <div v-if="hasPosts">
   -     <Post v-for="post in posts" :key="post.id" :post="post" />
   +     <Post v-for="post in posts" :key="post.id" :post="post" :comments="post.latestComments" />
       </div>
       <p v-else>No posts available</p>
     </template>
   ```

1. Pass the appropriate `comments` prop from `src/pages/PostPage.vue`

   ```diff
     <template>
       <div class="PostPage">
   -     <Post v-if="post" :post="post" />
   +     <Post v-if="post" :post="post" :comments="comments" />
       </div>
     </template>
   ```

### Switch to completed branch for this step:

```bash
git checkout 26-implement-comments-feature
```

---

- [**Return to previous step**](25-display-post-page-from-firestore.md)
- [**Proceed to next step**](27-implement-likes-feature.md)
