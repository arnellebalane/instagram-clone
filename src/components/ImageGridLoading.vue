<template>
  <div class="ImageGridLoading">
    <div class="ImageGridItem"></div>
    <div class="ImageGridItem"></div>
    <div class="ImageGridItem"></div>
  </div>
</template>

<style scoped>
.ImageGridLoading {
  display: flex;
  gap: 4px;
}

.ImageGridItem {
  flex: 1;
  background-color: var(--gray-100);
}

.ImageGridItem::before {
  content: '';
  display: block;
  padding-top: 100%;
}
</style>
