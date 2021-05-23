<template>
  <footer class="LoginFooter">
    <p>Don't have an account? <RouterLink to="/register">Register</RouterLink></p>
  </footer>
</template>

<style scoped>
footer {
  width: 100%;
  max-width: 36rem;
  padding: 2.4rem 3.6rem;
  border: 1px solid var(--gray-200);
  font-size: 1.4rem;
  text-align: center;
  background-color: var(--white);
}

a {
  font-weight: 700;
  text-decoration: none;
  color: var(--primary);
}
</style>
