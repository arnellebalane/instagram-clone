<template>
  <p>or</p>
</template>

<style scoped>
p {
  position: relative;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  color: var(--gray-400);
}

p::before,
p::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 40%;
  border-top: 1px solid var(--gray-300);
}

p::before {
  left: 0;
}

p::after {
  right: 0;
}
</style>
