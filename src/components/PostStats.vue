<template>
  <div class="PostStats">
    <p>{{ post.likes }} likes</p>
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
.PostStats {
  padding: 0 1.6rem;
  font-size: 1.4rem;
  font-weight: 700;
}
</style>
