<template>
  <article>
    <PostHeader :post="post" />
    <PostImage :post="post" />
    <PostActions :post="post" />
    <PostStats :post="post" />
    <PostComments :post="post" />
    <PostDate :post="post" />
    <PostNewComment />
  </article>
</template>

<script>
import PostHeader from '@components/PostHeader.vue';
import PostImage from '@components/PostImage.vue';
import PostActions from '@components/PostActions.vue';
import PostStats from '@components/PostStats.vue';
import PostComments from '@components/PostComments.vue';
import PostDate from '@components/PostDate.vue';
import PostNewComment from '@components/PostNewComment.vue';

export default {
  components: {
    PostHeader,
    PostImage,
    PostActions,
    PostStats,
    PostComments,
    PostDate,
    PostNewComment,
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
