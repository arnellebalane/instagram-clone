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
    <PostNewCommentForm :post="post" ref="postNewCommentForm" />
  </article>
</template>

<script>
import { mapState } from 'vuex';
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

  computed: mapState(['currentUser']),

  methods: {
    async likePost() {
      const callableFunction = this.liked ? 'unlikePost' : 'likePost';
      const failureMessage = this.liked
        ? 'Failed to unlike post. Please try again'
        : 'Failed to like post. Please try again';

      this.isLoading = true;
      this.$store.commit('clearError');
      try {
        await functions.httpsCallable(callableFunction)({ postId: this.post.id });
      } catch (error) {
        console.error(error);
        this.$store.commit('setError', failureMessage);
      }
      this.isLoading = false;
    },

    startComment() {
      this.$refs.postNewCommentForm.focusForm();
    },

    sharePost() {
      console.log('share', { id: this.post.id });
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
