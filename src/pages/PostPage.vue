<template>
  <div class="PostPage">
    <Post v-if="post" :post="post" :comments="comments" />
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
    this.unsubscribePost = db.doc(`posts/${this.$route.params.id}`).onSnapshot((doc) => {
      this.post = { ...doc.data(), id: doc.id };
    });

    this.unsubscribeComments = db
      .collection(`posts/${this.$route.params.id}/comments`)
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
