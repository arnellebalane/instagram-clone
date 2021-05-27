<template>
  <ul>
    <li>
      <div class="Value"></div>
      <div class="Label"></div>
    </li>
    <li>
      <div class="Value"></div>
      <div class="Label"></div>
    </li>
    <li>
      <div class="Value"></div>
      <div class="Label"></div>
    </li>
  </ul>
</template>

<style scoped>
ul {
  display: flex;
  gap: 4px;
  padding: 1.2rem 0;
  border-top: 1px solid var(--gray-100);
  border-bottom: 1px solid var(--gray-100);
  list-style: none;
}

li {
  flex-grow: 1;
}

.Value {
  width: 3.2rem;
  height: 1.6rem;
  border-radius: 2px;
  margin: 0 auto;
  margin-bottom: 2px;
  background-color: var(--gray-100);
}

.Label {
  width: 5.6rem;
  height: 1.6rem;
  border-radius: 2px;
  margin: 0 auto;
  background-color: var(--gray-100);
}
</style>
