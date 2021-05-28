<template>
  <div>
    <button v-if="file" type="button" :disabled="disabled" @click="clearFile">Clear</button>
    <label v-else>
      <input type="file" name="file" accept="image/*" :disabled="disabled" @change="selectFile" />
    </label>
  </div>
</template>

<script>
export default {
  props: {
    disabled: Boolean,
  },

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
    clearFile() {
      this.file = null;
    },

    selectFile(event) {
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

label:focus-within,
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
