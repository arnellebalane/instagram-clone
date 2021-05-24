<template>
  <p class="AppError">
    <slot></slot>
  </p>
</template>

<style scoped>
.AppError {
  max-width: 36rem;
  padding: 8px 1.6rem;
  border-radius: 4px;
  font-weight: 700;
  text-align: center;
  color: var(--white);
  background-color: var(--danger);
}
</style>
