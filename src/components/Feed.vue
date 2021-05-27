<template>
  <div class="Feed">
    <Post v-for="post in posts" :key="post.id" :post="post" :comments="post.latestComments" />
  </div>
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
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  gap: 6.4rem;
  padding-bottom: 10rem;
}
</style>
