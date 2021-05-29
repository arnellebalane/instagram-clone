# Implement Feed and Post components

1. Define mock data in `src/pages/FeedPage.vue`

   ```diff
     <script>
   + import firebase from '@lib/firebase';
     import NewPostForm from '@components/NewPostForm.vue';

     export default {
       components: {
         NewPostForm,
       },

   +   data() {
   +     return {
   +       posts: [
   +         {
   +           id: 'BHIvuCPC0xir16icwl7T',
   +           caption: 'hello world',
   +           photoURL:
   +             'http://localhost:9199/v0/b/instagram-clone-2d8bc.appspot.com/o/photos%2Fjn1M0FbcmcB54A6O8t6bEX4aTHlj%2F5039dadab9534994bc7748473cc58d31.jpeg?alt=media&token=979daac3-ed9a-4880-befb-cab26c96e110',
   +           datePosted: new firebase.firestore.Timestamp(1622246105, 412),
   +           likesCount: 10,
   +           commentsCount: 1,
   +           latestComments: [
   +             {
   +               id: 'abc123',
   +               body: 'this is cool!',
   +               author: {
   +                 id: 'jn1M0FbcmcB54A6O8t6bEX4aTHlj',
   +                 displayName: 'Arnelle Balane',
   +               },
   +             },
   +           ],
   +           author: {
   +             id: 'jn1M0FbcmcB54A6O8t6bEX4aTHlj',
   +             displayName: 'Arnelle Balane',
   +             photoURL:
   +               'https://res.cloudinary.com/arnellebalane/image/fetch/w_256,f_webp,q_85/https://arnellebalane.com/arnelle-avatar.jpg',
   +           },
   +         },
   +         {
   +           id: 'BHIvuCPC0xir16icwl7a',
   +           caption: 'hello world',
   +           photoURL:
   +             'http://localhost:9199/v0/b/instagram-clone-2d8bc.appspot.com/o/photos%2Fjn1M0FbcmcB54A6O8t6bEX4aTHlj%2F5039dadab9534994bc7748473cc58d31.jpeg?alt=media&token=979daac3-ed9a-4880-befb-cab26c96e110',
   +           datePosted: new firebase.firestore.Timestamp(1622246105, 412),
   +           likesCount: 20,
   +           commentsCount: 10,
   +           latestComments: [
   +             {
   +               id: 'abc1235',
   +               body: 'this is cool!',
   +               author: {
   +                 id: 'jn1M0FbcmcB54A6O8t6bEX4aTHlj',
   +                 displayName: 'Arnelle Balane',
   +               },
   +             },
   +             {
   +               id: 'abc1234',
   +               body: 'this is awesome!',
   +               author: {
   +                 id: 'jn1M0FbcmcB54A6O8t6bEX4aTHlj',
   +                 displayName: 'Arnelle Balane',
   +               },
   +             },
   +           ],
   +           author: {
   +             id: 'jn1M0FbcmcB54A6O8t6bEX4aTHlj',
   +             displayName: 'Arnelle Balane',
   +             photoURL:
   +               'https://res.cloudinary.com/arnellebalane/image/fetch/w_256,f_webp,q_85/https://arnellebalane.com/arnelle-avatar.jpg',
   +           },
   +         },
   +       ],
   +     };
   +   },
     };
     </script>
   ```

1. Create `src/components/Feed.vue`

   ```vue
   <template>
     <div v-if="hasPosts">
       <Post v-for="post in posts" :key="post.id" :post="post" />
     </div>
     <p v-else>No posts available</p>
   </template>

   <script>
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
       hasPosts() {
         return this.posts.length > 0;
       },
     },
   };
   </script>

   <style scoped>
   div {
     display: flex;
     flex-direction: column;
     gap: 6.4rem;
   }

   p {
     padding: 3.6rem;
     font-size: 1.2rem;
     font-weight: 700;
     text-align: center;
     text-transform: uppercase;
     color: var(--gray-400);
   }
   </style>
   ```

1. Render `Feed` component in `src/pages/FeedPage.vue`

   ```diff
     <template>
       <div class="FeedPage">
         <NewPostForm />
   +     <Feed :posts="posts" />
       </div>
     </template>

     <script>
     import firebase from '@lib/firebase';
     import NewPostForm from '@components/NewPostForm.vue';
   + import Feed from '@components/Feed.vue';

     export default {
       components: {
         NewPostForm,
   +     Feed,
       },
   ```

1. Create `src/components/Post.vue`

   ```vue
   <template>
     <article>
       <PostHeader :post="post" />
       <PostImage :post="post" />
       <PostActions :post="post" @like="likePost" @comment="startComment" @share="sharePost" />
       <PostStats :post="post" />
       <PostComments :post="post" />
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
     },

     methods: {
       likePost() {
         console.log('like');
       },

       startComment() {
         console.log('comment');
       },

       sharePost() {
         console.log('share');
       },
     },
   };
   </script>

   <style scoped>
   article {
     border: 1px solid var(--gray-200);
     border-radius: 2px;
     background-color: var(--white);
   }

   .PostStats,
   .PostDate {
     margin-bottom: 8px;
   }

   .PostComments {
     margin-bottom: 4px;
   }
   </style>
   ```

1. Create `src/components/PostHeader.vue`

   ```vue
   <template>
     <header>
       <img :src="authorPhotoURL" :alt="post.author.displayName" />

       <RouterLink :to="{ name: 'profile', params: { id: post.author.id } }">
         {{ post.author.displayName }}
       </RouterLink>
     </header>
   </template>

   <script>
   import defaultPhoto from '@assets/images/default-photo.jpg';

   export default {
     props: {
       post: {
         type: Object,
         required: true,
       },
     },

     computed: {
       authorPhotoURL() {
         return this.post.author.photoURL || defaultPhoto;
       },
     },
   };
   </script>

   <style scoped>
   header {
     display: flex;
     align-items: center;
     gap: 1.6rem;

     padding: 1.6rem;
     border-bottom: 1px solid var(--gray-100);
   }

   img {
     width: 3.2rem;
     height: 3.2rem;
     object-fit: cover;
     object-position: center center;
     border: 1px solid var(--gray-300);
     border-radius: 50%;
   }

   a {
     font-weight: 700;
   }
   </style>
   ```

1. Create `src/components/PostImage.vue`

   ```vue
   <template>
     <img :src="post.photoURL" :alt="post.caption" loading="lazy" />
   </template>

   <script>
   export default {
     props: {
       post: {
         type: Object,
         required: true,
       },
     },
   };
   </script>

   <style scoped>
   img {
     display: block;
     width: 100%;
   }
   </style>
   ```

1. Create `src/components/PostActions.vue`

   ```vue
   <template>
     <div class="PostActions">
       <button :disabled="disabled" @click="$emit('like')">
         <img v-if="liked" src="@assets/icons/heart-red.svg" alt="Like" />
         <img v-else src="@assets/icons/heart.svg" alt="Like" />
         Like
       </button>
       <button @click="$emit('comment')">
         <img src="@assets/icons/comment.svg" alt="Comment" />
         Comment
       </button>
       <button @click="$emit('share')">
         <img src="@assets/icons/share.svg" alt="Share" />
         Share
       </button>
     </div>
   </template>

   <script>
   export default {
     props: {
       liked: Boolean,
       disabled: Boolean,
     },

     emits: ['like', 'comment', 'share'],
   };
   </script>

   <style scoped>
   div {
     display: flex;
     padding: 8px;
   }

   button {
     width: 3.8rem;
     height: 3.8rem;
     padding: 8px;
     border: none;
     font-size: 0;
     background: none;
     cursor: pointer;
   }

   img {
     display: block;
     width: 100%;
     height: 100%;
   }
   </style>
   ```

1. Create `src/components/PostStats.vue`

   ```vue
   <template>
     <div class="PostStats">
       <p>{{ likesCount }} likes</p>
     </div>
   </template>

   <script>
   export default {
     props: {
       post: {
         type: Object,
         required: true,
       },
     },

     computed: {
       likesCount() {
         return this.post.likesCount;
       },
     },
   };
   </script>

   <style scoped>
   div {
     padding: 0 1.6rem;
     font-weight: 700;
   }
   </style>
   ```

1. Create `src/components/PostComments.vue`

   ```vue
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

       <p v-for="comment in post.latestComments" :key="comment.id">
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
     },

     computed: {
       hasMoreComments() {
         return this.post.commentsCount > this.post.latestComments.length;
       },
     },
   };
   </script>

   <style scoped>
   div {
     display: flex;
     flex-direction: column;
     gap: 4px;
     padding: 0 1.6rem;
   }

   .ViewAllComments {
     color: var(--gray-500);
   }

   .AuthorName {
     font-weight: 700;
   }
   </style>
   ```

1. Create `src/components/PostDate.vue`

   ```vue
   <template>
     <div class="PostDate">
       <RouterLink :to="{ name: 'post', params: { id: post.id } }">
         <time :datetime="datePostedISO">{{ datePostedFormatted }}</time>
       </RouterLink>
     </div>
   </template>

   <script>
   import dayjs from 'dayjs';
   import relativeTime from 'dayjs/plugin/relativeTime';

   dayjs.extend(relativeTime);

   export default {
     props: {
       post: {
         type: Object,
         required: true,
       },
     },

     computed: {
       datePosted() {
         return this.post.datePosted.toDate();
       },

       datePostedISO() {
         return this.datePosted.toISOString();
       },

       datePostedFormatted() {
         return dayjs(this.datePosted).fromNow();
       },
     },
   };
   </script>

   <style scoped>
   div {
     padding: 0 1.6rem;
   }

   time {
     font-size: 1rem;
     text-transform: uppercase;
     color: var(--gray-500);
   }
   </style>
   ```

1. Create `src/components/PostNewCommentForm.vue`

   ```vue
   <template>
     <form @submit.prevent="submitForm">
       <img :src="currentUserPhotoURL" :alt="currentUser?.displayName" />
       <input
         type="text"
         name="comment"
         placeholder="Add a comment..."
         ref="commentInput"
         v-model="comment"
         :disabled="isLoading"
         required
       />
       <button :disabled="isLoading || !isFormValid">Post</button>
     </form>
   </template>

   <script>
   import { mapState } from 'vuex';
   import defaultPhoto from '@assets/images/default-photo.jpg';

   export default {
     props: {
       post: {
         type: Object,
         required: true,
       },
     },

     data() {
       return {
         comment: '',
         isLoading: false,
       };
     },

     computed: {
       ...mapState(['currentUser']),

       currentUserPhotoURL() {
         return this.currentUser?.photoURL || defaultPhoto;
       },

       isFormValid() {
         return this.comment.length > 0;
       },
     },

     methods: {
       focusForm() {
         this.$refs.commentInput.focus();
       },

       clearForm() {
         this.comment = '';
       },

       async submitForm() {
         this.isLoading = true;
         this.$store.commit('clearError');

         try {
           // TODO: Save comment to Firestore
           console.log({ body: this.comment });
           this.clearForm();
         } catch (error) {
           console.error(error);
           this.$store.commit('setError', 'Failed to save comment. Please try again.');
         }

         this.isLoading = false;
       },
     },
   };
   </script>

   <style scoped>
   form {
     display: flex;
     align-items: center;
     gap: 1.6rem;
     padding: 1.6rem;
     border-top: 1px solid var(--gray-100);
   }

   img {
     width: 2.4rem;
     height: 2.4rem;
     object-fit: cover;
     object-position: center center;
     border: 1px solid var(--gray-300);
     border-radius: 50%;
   }

   input {
     flex-grow: 1;
     padding: 8px 0;
     border: none;
     outline: none;
   }

   button {
     padding: 8px;
     border: none;
     margin-right: -8px;
     font-weight: 700;
     color: var(--primary);
     background: none;
   }
   </style>
   ```

### Switch to completed branch for this step:

```bash
git checkout 21-implement-feed-and-post-components
```

---

- [**Return to previous step**](20-add-loading-state-and-error-handling.md)
- [**Proceed to next step**](22-display-posts-from-firestore.md)
