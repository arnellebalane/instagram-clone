<template>
  <div class="Wrapper">
    <RouterView />
  </div>
</template>

<style scoped>
.Wrapper {
  display: flex;
  flex-direction: column;

  max-width: 54rem;
  min-height: 100vh;
  padding: 7.4rem 2.4rem;
  margin: 0 auto;
}
</style>
