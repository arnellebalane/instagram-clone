<template>
  <div>
    <PostLoading />
    <PostLoading />
  </div>
</template>

<script>
import PostLoading from '@components/PostLoading.vue';

export default {
  components: {
    PostLoading,
  },
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  gap: 6.4rem;
  padding-bottom: 10rem;
}
</style>
