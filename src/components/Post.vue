<template>
  <article>
    <PostHeader :post="post" />
    <PostImage :post="post" />
    <PostActions :post="post" />
    <PostStats :post="post" />
  </article>
</template>

<script>
import PostHeader from '@components/PostHeader.vue';
import PostImage from '@components/PostImage.vue';
import PostActions from '@components/PostActions.vue';
import PostStats from '@components/PostStats.vue';

export default {
  components: {
    PostHeader,
    PostImage,
    PostActions,
    PostStats,
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
