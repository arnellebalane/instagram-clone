<template>
  <AppHeader v-if="isLoggedIn" />
  <AppError v-if="hasError">{{ error }}</AppError>

  <div class="Wrapper">
    <RouterView class="Page" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { auth, db } from '@lib/firebase';
import AppHeader from '@components/AppHeader.vue';
import AppError from '@components/AppError.vue';

export default {
  components: {
    AppHeader,
    AppError,
  },

  computed: {
    ...mapState(['currentUser', 'error']),
    ...mapGetters(['isLoggedIn', 'hasError']),
  },

  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.unsubscribeLikes = db.collection(`users/${this.currentUser.uid}/likes`).onSnapshot((snapshot) => {
          const likes = snapshot.docs.map((doc) => ({ id: doc.id }));
          this.$store.commit('setCurrentUserLikes', likes);
        });
      } else if (this.unsubscribeLikes) {
        this.unsubscribeLikes();
      }
    });
  },

  unmounted() {
    if (this.unsubscribeLikes) {
      this.unsubscribeLikes();
    }
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

.AppHeader {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
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
