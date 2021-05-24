<template>
  <div>
    <img :src="post.photoURL" :alt="post.caption" />
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
  position: relative;
  padding-top: 100%;
}

img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}
</style>
