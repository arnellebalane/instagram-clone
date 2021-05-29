<template>
  <article>
    <PostHeader :post="post" />
    <PostImage :post="post" />
    <PostActions
      :post="post"
      :liked="liked"
      :disabled="isLoading"
      @like="likePost"
      @comment="startComment"
      @share="sharePost"
    />
    <PostStats :post="post" />
    <PostComments :post="post" :comments="comments" />
    <PostDate :post="post" />
    <PostNewCommentForm :post="post" />
  </article>
</template>

<script>
import { functions } from '@lib/firebase';
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
    comments: {
      type: Array,
      required: true,
    },
    liked: Boolean,
  },

  data() {
    return {
      isLoading: false,
    };
  },

  methods: {
    async likePost() {
      this.isLoading = true;
      this.$store.commit('clearError');

      try {
        const functionName = this.liked ? 'unlikePost' : 'likePost';
        await functions.httpsCallable(functionName)({
          postId: this.post.id,
        });
      } catch (error) {
        console.error(error);
        this.$store.setError('Failed to like the post. Please try again.');
      }
      this.isLoading = false;
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
