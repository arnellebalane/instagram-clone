<template>
  <ul class="UserDropdown" :class="{ open: modelValue }">
    <li>
      <span>{{ user.displayName }}</span>
    </li>
    <li>
      <RouterLink :to="{ name: 'profile', params: { id: user.uid } }">Profile</RouterLink>
    </li>
    <li>
      <button @click="logout">Logout</button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    modelValue: Boolean,
    user: {
      type: Object,
      required: true,
    },
  },

  emits: ['logout', 'update:modelValue'],

  watch: {
    modelValue(value) {
      if (value) {
        document.addEventListener('click', this.handleClick);
      } else {
        document.removeEventListener('click', this.handleClick);
      }
    },
  },

  methods: {
    handleClick() {
      this.$emit('update:modelValue', false);
    },

    logout() {
      this.$emit('logout');
    },
  },
};
</script>

<style scoped>
ul {
  width: 18rem;
  padding: 0;
  border-radius: 4px;

  list-style: none;
  background-color: var(--white);
  box-shadow: 0 0 8px var(--gray-300);
}

ul:not(.open) {
  display: none;
}

ul::before {
  content: '';
  position: absolute;
  top: 0;
  right: 1.8rem;
  width: 1.2rem;
  height: 1.2rem;
  background-color: var(--white);
  box-shadow: 1px -1px 1px var(--gray-200);
  transform: translateY(-5px) rotate(-45deg);
  transform-origin: center center;
}

li {
  font-size: 1.4rem;
}

li span,
li a,
li button {
  display: block;
  width: 100%;
  padding: 8px 1.6rem;
  text-align: left;
}

li span {
  border-bottom: 1px solid var(--gray-100);
  font-weight: 700;
}

li a {
  text-decoration: none;
}

li button {
  border: none;
  background: none;
  cursor: pointer;
}

li a:hover,
li a:focus,
li button:hover,
li button:focus {
  background-color: var(--gray-50);
}

li:last-child > * {
  border-radius: 0 0 4px 4px;
}
</style>
