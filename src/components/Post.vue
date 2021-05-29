<template>
  <article>
    <PostHeader :post="post" />
    <PostImage :post="post" />
    <PostActions :post="post" @like="likePost" @comment="startComment" @share="sharePost" />
    <PostStats :post="post" />
    <PostComments :post="post" />
    <PostDate :post="post" />
    <PostNewCommentForm :post="post" />
  </article>
</template>

<script>
import PostHeader from '@components/PostHeader.vue';
import PostImage from '@components/PostImage.vue';
import PostActions from '@components/PostActions.vue';
import PostStats from '@components/PostStats.vue';
import PostComments from '@components/PostComments.vue';
import PostDate from '@components/PostDate.vue';
import PostNewCommentForm from '@components/PostNewCommentForm.vue';

export default {
  components: {
    PostHeader,
    PostImage,
    PostActions,
    PostStats,
    PostComments,
    PostDate,
    PostNewCommentForm,
  },

  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  methods: {
    likePost() {
      console.log('like');
    },

    startComment() {
      console.log('comment');
    },

    sharePost() {
      console.log('share');
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

.PostStats,
.PostDate {
  margin-bottom: 8px;
}

.PostComments {
  margin-bottom: 4px;
}
</style>
