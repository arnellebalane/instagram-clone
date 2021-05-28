<template>
  <AppError v-if="hasError">{{ error }}</AppError>

  <div class="Wrapper">
    <RouterView class="Page" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import AppError from '@components/AppError.vue';

export default {
  components: {
    AppError,
  },

  computed: {
    ...mapState(['error']),
    ...mapGetters(['hasError']),
  },
};
</script>

<style scoped>
.Wrapper {
  display: flex;
  flex-direction: column;

  max-width: 54rem;
  min-height: 100vh;
  padding: 7.4rem 2.4rem;
  margin: 0 auto;
}

.AppError {
  position: fixed;
  top: 3.2rem;
  left: 50%;
  z-index: 11;
  transform: translateX(-50%);
}

.Page {
  flex-grow: 1;
}
</style>
