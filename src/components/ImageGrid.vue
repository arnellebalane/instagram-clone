<template>
  <div>
    <ImageGridItem v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import ImageGridItem from '@components/ImageGridItem.vue';

export default {
  components: {
    ImageGridItem,
  },

  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
div {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  cursor: pointer;
}
</style>
