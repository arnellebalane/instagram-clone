<template>
  <div>
    <button v-if="file" type="button" @click="handleClear">Clear</button>
    <label v-else>
      <input type="file" name="file" @change="handleChange" />
    </label>
  </div>
</template>

<script>
export default {
  emits: ['change'],

  data() {
    return {
      file: null,
    };
  },

  watch: {
    file(value) {
      this.$emit('change', value);
    },
  },

  methods: {
    handleClear() {
      this.file = null;
    },

    handleChange(event) {
      this.file = event.target.files[0];
    },
  },
};
</script>

<style scoped>
label,
button {
  display: block;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 4px;
  background: var(--gray-100) center center no-repeat;
  background-size: 1.8rem;
  cursor: pointer;
}

label:hover,
label:focus-within,
button:hover,
button:focus {
  background-color: var(--gray-200);
}

label {
  position: relative;
  background-image: url('@assets/icons/image.svg');
}

button {
  border: none;
  font-size: 0;
  background-image: url('@assets/icons/close.svg');
}

input[type='file'] {
  position: absolute;
  opacity: 0;
  transform: scale(0);
}
</style>
