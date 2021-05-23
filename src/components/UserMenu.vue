<template>
  <div class="UserMenu">
    <button :class="{ open: isOpen }" @click.stop="toggleDropdown">
      <img :src="userPhoto" :alt="user.displayName" />
    </button>

    <UserDropdown v-model="isOpen" :user="user" @logout="logout" />
  </div>
</template>

<script>
import { auth } from '@lib/firebase';
import UserDropdown from '@components/UserDropdown.vue';
import defaultPhoto from '@assets/images/default-photo.jpg';

export default {
  components: {
    UserDropdown,
  },

  data() {
    return {
      isOpen: false,
    };
  },

  computed: {
    user() {
      return this.$store.state.currentUser;
    },

    userPhoto() {
      return this.user.photoURL || defaultPhoto;
    },
  },

  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },

    logout() {
      auth.signOut();
    },
  },
};
</script>

<style scoped>
.UserMenu {
  position: relative;
}

.UserDropdown {
  position: absolute;
  top: calc(100% + 1.2rem);
  right: -1.2rem;
}

button {
  width: 2.4rem;
  height: 2.4rem;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: none;
}

button.open {
  box-shadow: 0 0 0 1px var(--white), 0 0 0 2px var(--gray-500);
}

img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  border: 1px solid var(--gray-300);
  border-radius: 50%;
  cursor: pointer;
}
</style>
