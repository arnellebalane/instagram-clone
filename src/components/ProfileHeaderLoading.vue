<template>
  <header>
    <div class="Avatar"></div>

    <div class="Details">
      <div class="Name"></div>
      <div class="Description"></div>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  gap: 3.6rem;
}

.Avatar {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background-color: var(--gray-100);
}

.Details {
  flex-grow: 1;
  padding-top: 1.2rem;
}

.Name {
  width: 70%;
  height: 3.2rem;
  border-radius: 2px;
  margin-bottom: 4px;
  background-color: var(--gray-100);
}

.Description {
  width: 40%;
  height: 2rem;
  border-radius: 2px;
  background-color: var(--gray-100);
}
</style>
