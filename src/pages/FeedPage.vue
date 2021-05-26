<template>
  <div class="FeedPage">
    <NewPostForm @submit="createPost" />
    <Feed :posts="posts" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import firebase, { db, storage } from '@lib/firebase';
import NewPostForm from '@components/NewPostForm.vue';
import Feed from '@components/Feed.vue';

export default {
  components: {
    NewPostForm,
    Feed,
  },

  data() {
    return {
      posts: [
        {
          id: 'abc123',
          photoURL:
            'https://images.unsplash.com/photo-1621716362967-fd1c5281eef9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500',
          caption: 'This is a cool photo',
          likesCount: 10,
          datePosted: new Date('2021-05-01 03:14:00'),
          comments: [
            {
              id: 'abcde12345',
              body: 'this looks so cool!',
              datePosted: new Date('2021-05-02 05:12:21'),
              author: {
                id: 'abcdef123456',
                displayName: 'Random User',
              },
            },
          ],
          author: {
            id: 'abcd1234',
            displayName: 'Arnelle Balane',
            photoURL: 'https://lh3.googleusercontent.com/a-/AOh14GgvGHJODi4nZbu_nj5UCVirg3aR0jpzkHgJvAr2og=s96-c',
          },
        },
        {
          id: 'abc1234',
          photoURL:
            'https://images.unsplash.com/photo-1621716362967-fd1c5281eef9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500',
          caption: 'This is a cool photo',
          likesCount: 10,
          datePosted: new Date('2021-05-01 03:14:00'),
          comments: [
            {
              id: 'abcde12345',
              body: 'this looks so cool!',
              datePosted: new Date('2021-05-02 05:12:21'),
              author: {
                id: 'abcdef123456',
                displayName: 'Random User',
              },
            },
          ],
          author: {
            id: 'abcd1234',
            displayName: 'Arnelle Balane',
            photoURL: 'https://lh3.googleusercontent.com/a-/AOh14GgvGHJODi4nZbu_nj5UCVirg3aR0jpzkHgJvAr2og=s96-c',
          },
        },
      ],
    };
  },

  computed: mapState(['currentUser']),

  methods: {
    async createPost(data) {
      const postRef = db.collection('posts').doc();

      const photoType = data.file.type.split('/')[1];
      const photoRef = storage.ref(`photos/${postRef.id}.${photoType}`);
      await photoRef.put(data.file);

      const postData = {
        caption: data.caption,
        photoURL: await photoRef.getDownloadURL(),
        datePosted: firebase.firestore.FieldValue.serverTimestamp(),
        author: {
          id: this.currentUser.uid,
          displayName: this.currentUser.displayName,
          photoURL: this.currentUser.photoURL,
        },
      };
      await postRef.set(postData);
    },
  },
};
</script>

<style scoped>
.NewPostForm {
  margin-bottom: 2.4rem;
}
</style>
