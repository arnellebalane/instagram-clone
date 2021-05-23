<template>
  <header class="AppHeader">
    <div class="Wrapper">
      <img class="Logo" src="@assets/images/logo.png" alt="Instagram logo" />
      <img class="ProfilePhoto" src="@assets/images/default-photo.jpg" alt="Arnelle Balane" />
    </div>
  </header>
</template>

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

.Logo {
  height: 2.8rem;
  margin-top: 8px;
}

.ProfilePhoto {
  width: 2.4rem;
  height: 2.4rem;
  object-fit: cover;
  object-position: center center;
  border: 1px solid var(--gray-300);
  border-radius: 50%;
}
</style>
