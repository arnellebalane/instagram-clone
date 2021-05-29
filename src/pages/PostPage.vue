<template>
  <div class="PostPage">
    <Post v-if="post" :post="post" />
  </div>
</template>

<script>
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
