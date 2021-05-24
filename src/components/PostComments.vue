<template>
  <div>
    <p>
      <RouterLink :to="{ name: 'profile', params: { id: post.author.id } }">{{ post.author.name }}</RouterLink>
      {{ post.caption }}
    </p>

    <p v-for="comment in post.comments" :key="comment.id">
      <RouterLink :to="{ name: 'profile', params: { id: comment.author.id } }">{{ comment.author.name }}</RouterLink>
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
  padding: 1rem 1.6rem;
}

p {
  margin: 4px 0;
  font-size: 1.4rem;
}

a {
  font-weight: 700;
  text-decoration: none;
}
</style>
