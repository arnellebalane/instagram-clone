<template>
  <header class="AppHeader">
    <div class="Wrapper">
      <RouterLink to="/feed">
        <img src="@assets/images/logo.png" alt="Instagram logo" />
      </RouterLink>

      <UserMenu />
    </div>
  </header>
</template>

<script>
import UserMenu from '@components/UserMenu.vue';

export default {
  components: {
    UserMenu,
  },
};
</script>

<style scoped>
header {
  border-bottom: 1px solid var(--gray-200);
  background-color: var(--white);
}

.Wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 50rem;
  height: 5rem;
  margin: 0 auto;
}

img {
  display: block;
  height: 2.8rem;
  margin-top: 8px;
}
</style>
