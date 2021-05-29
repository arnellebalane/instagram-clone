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
