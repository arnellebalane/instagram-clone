<template>
  <div class="PostPage">
    <Post :post="post" />
  </div>
</template>

<script>
import Post from '@components/Post.vue';

export default {
  components: {
    Post,
  },

  data() {
    return {
      post: {
        id: 'abc123',
        photoURL:
          'https://images.unsplash.com/photo-1621716362967-fd1c5281eef9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500',
        caption: 'This is a cool photo',
        likes: 10,
        datePosted: new Date('2021-05-01 03:14:00'),
        comments: [
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
      },
    };
  },
};
</script>
