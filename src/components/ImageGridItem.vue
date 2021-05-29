<template>
  <div class="ImageGridItem">
    <img class="Image" :src="post.photoURL" :alt="post.caption" />

    <RouterLink :to="{ name: 'post', params: { id: post.id } }">
      <img src="@assets/icons/heart-filled.svg" alt="" />
      <p>{{ post.likesCount }}</p>
    </RouterLink>
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
.ImageGridItem {
  position: relative;
  padding-top: 100%;
}

.Image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

a {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background-color: var(--gray-transparent);
  opacity: 0;
}

.ImageGridItem:hover a,
.ImageGridItem:focus-within a {
  opacity: 1;
}

p {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--white);
}
</style>
