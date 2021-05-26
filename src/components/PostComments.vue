<template>
  <div class="PostComments">
    <p>
      <RouterLink :to="{ name: 'profile', params: { id: post.author.id } }">
        {{ post.author.displayName }}
      </RouterLink>
      {{ post.caption }}
    </p>

    <p v-for="comment in post.comments" :key="comment.id">
      <RouterLink :to="{ name: 'profile', params: { id: comment.author.id } }">
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

a {
  font-weight: 700;
}
</style>
