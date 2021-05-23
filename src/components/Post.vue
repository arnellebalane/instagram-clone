<template>
  <article>
    <PostHeader :author="post.author" />
  </article>
</template>

<script>
import PostHeader from '@components/PostHeader.vue';

export default {
  components: {
    PostHeader,
  },

  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
article {
  border: 1px solid var(--gray-200);
  border-radius: 2px;
  background-color: var(--white);
}
</style>
