<template>
  <form class="NewPostForm" @submit.prevent="handleSubmit">
    <img class="Avatar" :src="userPhoto" :alt="user.displayName" />

    <div class="Fields">
      <input type="text" name="caption" placeholder="Add a caption..." v-model="caption" required />
      <FilePicker @change="handleChange" />
      <button :disabled="!isFormValid">Post</button>
    </div>

    <div v-if="filePreviewURL" class="Preview">
      <img :src="filePreviewURL" alt="" />
    </div>
  </form>
</template>

<script>
import FilePicker from '@components/FilePicker.vue';
import defaultPhoto from '@assets/images/default-photo.jpg';

export default {
  components: {
    FilePicker,
  },

  emits: ['submit'],

  data() {
    return {
      file: null,
      caption: '',
    };
  },

  computed: {
    user() {
      return this.$store.state.currentUser;
    },

    userPhoto() {
      return this.user.photoURL || defaultPhoto;
    },

    isFormValid() {
      return this.file && this.caption.length > 0;
    },

    filePreviewURL() {
      return this.file ? URL.createObjectURL(this.file) : null;
    },
  },

  methods: {
    handleChange(file) {
      this.file = file;
      if (!file) {
        this.caption = '';
      }
    },

    handleSubmit() {
      this.$emit('submit', {
        file: this.file,
        caption: this.caption,
      });
    },
  },
};
</script>

<style scoped>
form {
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-areas: '. .' 'preview preview';
  column-gap: 8px;
  row-gap: 1.6rem;

  padding: 1.6rem;
  padding-bottom: 0;
  border: 1px solid var(--gray-200);
  background-color: var(--white);
}

.Avatar {
  width: 3.2rem;
  height: 3.2rem;
  object-fit: cover;
  object-position: center center;
  border: 1px solid var(--gray-300);
  border-radius: 50%;
}

.Fields {
  display: flex;
  gap: 8px;
}

input[type='text'] {
  flex-grow: 1;
  padding: 8px;
  border: none;
  line-height: 1.6rem;
  resize: none;
}

button {
  padding: 0 1.2rem;
  border: none;
  border-radius: 4px;
  font-weight: 700;
  line-height: 3.2rem;
  color: var(--white);
  background-color: var(--primary);
  cursor: pointer;
}

.Preview {
  grid-area: preview;
  margin: 0 -1.6rem;
}

.Preview img {
  display: block;
  width: 100%;
}
</style>
