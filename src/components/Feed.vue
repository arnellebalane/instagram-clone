<template>
  <div v-if="hasPosts">
    <Post
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :comments="post.latestComments"
      :liked="isLikedPost(post)"
    />
  </div>
  <p v-else>No posts available</p>
</template>

<script>
import { mapState } from 'vuex';
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
    ...mapState(['currentUserLikes']),

    hasPosts() {
      return this.posts.length > 0;
    },
  },

  methods: {
    isLikedPost(post) {
      return post.id in this.currentUserLikes;
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
