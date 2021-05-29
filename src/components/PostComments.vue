<template>
  <div class="PostComments">
    <p>
      <RouterLink class="AuthorName" :to="{ name: 'profile', params: { id: post.author.id } }">
        {{ post.author.displayName }}
      </RouterLink>
      {{ post.caption }}
    </p>

    <RouterLink class="ViewAllComments" v-if="hasMoreComments" :to="{ name: 'post', params: { id: post.id } }">
      View all {{ post.commentsCount }} comments
    </RouterLink>

    <p v-for="comment in comments" :key="comment.id">
      <RouterLink class="AuthorName" :to="{ name: 'profile', params: { id: comment.author.id } }">
        {{ comment.author.displayName }}
      </RouterLink>
      {{ comment.body }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    comments: {
      type: Array,
      required: true,
    },
  },

  computed: {
    hasMoreComments() {
      return this.post.commentsCount > this.comments.length;
    },
  },
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 1.6rem;
}

.ViewAllComments {
  color: var(--gray-500);
}

.AuthorName {
  font-weight: 700;
}
</style>
