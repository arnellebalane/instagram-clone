<template>
  <article>
    <PostHeader :post="post" />
    <PostImage :post="post" />
  </article>
</template>

<script>
import PostHeader from '@components/PostHeader.vue';
import PostImage from '@components/PostImage.vue';

export default {
  components: {
    PostHeader,
    PostImage,
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
