<template>
  <div class="Feed">
    <Post v-for="post in posts" :key="post.id" :post="post" />
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
.Feed {
  display: flex;
  flex-direction: column;
  gap: 6.4rem;
}
</style>
