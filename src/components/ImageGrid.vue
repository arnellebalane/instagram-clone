<template>
  <div v-if="hasPosts">
    <ImageGridItem v-for="post in posts" :key="post.id" :post="post" />
  </div>
  <p v-else>No posts available</p>
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

  computed: {
    hasPosts() {
      return this.posts.length > 0;
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

p {
  padding: 3.6rem;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  color: var(--gray-400);
}
</style>
