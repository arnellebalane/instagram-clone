<template>
  <article>
    <div class="Content">
      <header>
        <div class="Avatar"></div>
        <div class="Name"></div>
      </header>
      <div class="Photo"></div>
      <div class="Caption"></div>
    </div>
  </article>
</template>

<style scoped>
article {
  position: relative;
  padding-top: 100%;
  border-radius: 2px;
  background-color: var(--gray-100);
}

.Content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

header {
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 1.6rem;
}

.Avatar {
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  background-color: var(--gray-50);
}

.Name {
  width: 50%;
  height: 2rem;
  border-radius: 2px;
  background-color: var(--gray-50);
}

.Photo {
  height: 70%;
  padding: 0 1.6rem;
  border-radius: 2px;
  background-color: var(--gray-50);
  background-clip: content-box;
}

.Caption {
  width: 80%;
  height: 2rem;
  border-radius: 2px;
  margin: 1.6rem;
  background-color: var(--gray-50);
}
</style>
