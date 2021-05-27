<template>
  <div class="PostPage">
    <PostLoading v-if="postLoading" />
    <Post v-else :post="post" :comments="comments" :liked="isLikedPost" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { db } from '@lib/firebase';
import Post from '@components/Post.vue';
import PostLoading from '@components/PostLoading.vue';

export default {
  components: {
    Post,
    PostLoading,
  },

  data() {
    return {
      post: null,
      comments: [],
      postLoading: true,
    };
  },

  computed: {
    ...mapState(['currentUserLikes']),

    isLikedPost() {
      return this.post?.id in this.currentUserLikes;
    },
  },

  mounted() {
    this.unsubscribePost = db.doc(`posts/${this.$route.params.id}`).onSnapshot((doc) => {
      if (doc.exists) {
        this.post = { ...doc.data(), id: doc.id };
        this.postLoading = false;
      } else {
        this.$router.push({ name: 'not-found' });
      }
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
