<template>
  <div class="PostStats">
    <p>{{ post.likesCount }} likes</p>
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
  padding: 0 1.6rem;
  font-weight: 700;
}
</style>
