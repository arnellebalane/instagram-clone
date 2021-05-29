# Implement ProfilePage UI

1. Define mock data and load components in `src/pages/ProfilePage.vue` (replace current contents)

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
         user: {
           id: 'abc123',
           displayName: 'Arnelle Balane',
           photoURL: 'https://lh3.googleusercontent.com/a-/AOh14GgvGHJODi4nZbu_nj5UCVirg3aR0jpzkHgJvAr2og=s96-c',
           postsCount: 10,
           followersCount: 100,
           followingCount: 20,
           description: 'Software Developer, Newlogic',
         },
         posts: new Array(12).fill(0).map((i) => ({
           id: `abc123${i}`,
           photoURL:
             'https://images.unsplash.com/photo-1621716362967-fd1c5281eef9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500',
           caption: 'This is a cool photo',
           likesCount: 10,
           datePosted: new Date('2021-05-01 03:14:00'),
           latestComments: [
             {
               id: 'abcde12345',
               body: 'this looks so cool!',
               datePosted: new Date('2021-05-02 05:12:21'),
               author: {
                 id: 'abcdef123456',
                 name: 'Random User',
               },
             },
           ],
           author: {
             id: 'abcd1234',
             name: 'Arnelle Balane',
             photoURL: 'https://lh3.googleusercontent.com/a-/AOh14GgvGHJODi4nZbu_nj5UCVirg3aR0jpzkHgJvAr2og=s96-c',
           },
         })),
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

1. Create `src/components/ProfileHeader.vue`

   ```vue
   <template>
     <header>
       <img :src="userPhotoURL" :alt="user.displayName" />

       <div>
         <h1>{{ user.displayName }}</h1>
         <p>{{ user.description }}</p>
       </div>
     </header>
   </template>

   <script>
   import defaultPhoto from '@assets/images/default-photo.jpg';

   export default {
     props: {
       user: {
         type: Object,
         required: true,
       },
     },

     computed: {
       userPhotoURL() {
         return this.user.photoURL || defaultPhoto;
       },
     },
   };
   </script>

   <style scoped>
   header {
     display: flex;
     gap: 3.6rem;
   }

   img {
     width: 8rem;
     height: 8rem;
     object-fit: cover;
     object-position: center center;
     border: 1px solid var(--gray-300);
     border-radius: 50%;
   }

   div {
     padding-top: 1.2rem;
   }

   h1 {
     margin-bottom: 4px;
     font-size: 2.4rem;
     font-weight: 400;
   }
   </style>
   ```

1. Create `src/components/ProfileStats.vue`

   ```vue
   <template>
     <ul>
       <li>
         <strong>{{ user.postsCount }}</strong> posts
       </li>
       <li>
         <strong>{{ user.followersCount }}</strong> followers
       </li>
       <li>
         <strong>{{ user.followingCount }}</strong> following
       </li>
     </ul>
   </template>

   <script>
   export default {
     props: {
       user: {
         type: Object,
         required: true,
       },
     },
   };
   </script>

   <style scoped>
   ul {
     display: flex;
     gap: 4px;
     padding: 1.2rem 0;
     border-top: 1px solid var(--gray-200);
     border-bottom: 1px solid var(--gray-200);
     list-style: none;
   }

   li {
     flex-grow: 1;
     text-align: center;
     color: var(--gray-500);
   }

   strong {
     display: block;
     color: var(--gray-900);
   }
   </style>
   ```

1. Create `src/components/ImageGrid.vue`

   ```vue
   <template>
     <div v-if="hasPosts">
       <ImageGridItem v-for="post in posts" :key="post.id" :post="post" />
     </div>
     <p v-else>No posts available</p>
   </template>

   <script>
   import ImageGridItem from '@components/ImageGridItem.vue';

   export default {
     components: {
       ImageGridItem,
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
     display: grid;
     grid-template-columns: repeat(3, 1fr);
     gap: 4px;
     cursor: pointer;
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

1. Create `src/components/ImageGridItem.vue`

   ```vue
   <template>
     <div class="ImageGridItem">
       <img class="Image" :src="post.photoURL" :alt="post.caption" />

       <RouterLink :to="{ name: 'post', params: { id: post.id } }">
         <img src="@assets/icons/heart-filled.svg" alt="" />
         <p>{{ post.likesCount }}</p>
       </RouterLink>
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
   };
   </script>

   <style scoped>
   .ImageGridItem {
     position: relative;
     padding-top: 100%;
   }

   .Image {
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     object-fit: cover;
     object-position: center center;
   }

   a {
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     display: flex;
     justify-content: center;
     align-items: center;
     gap: 8px;
     background-color: var(--gray-transparent);
     opacity: 0;
   }

   .ImageGridItem:hover a,
   .ImageGridItem:focus-within a {
     opacity: 1;
   }

   p {
     font-size: 1.8rem;
     font-weight: 700;
     color: var(--white);
   }
   </style>
   ```

### Switch to completed branch for this step:

```bash
git checkout 23-implement-profile-page-ui
```

---

- [**Return to previous step**](22-display-posts-from-firestore.md)
- [**Proceed to next step**](24-display-profile-from-firestore.md)
