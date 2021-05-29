<template>
  <img :src="post.photoURL" :alt="post.caption" loading="lazy" />
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
img {
  display: block;
  width: 100%;
}
</style>
