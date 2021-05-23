<template>
  <div class="AuthCard">
    <slot></slot>
  </div>
</template>

<style scoped>
.AuthCard {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 100%;
  max-width: 36rem;
  padding: 3.6rem;
  border: 1px solid var(--gray-200);
  background-color: var(--white);
}
</style>
