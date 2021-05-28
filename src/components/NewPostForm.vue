<template>
  <form class="NewPostForm" @submit.prevent="submitForm">
    <img class="Avatar" :src="currentUserPhotoURL" :alt="currentUser?.displayName" />

    <div class="Fields">
      <input
        type="text"
        name="caption"
        placeholder="Add a caption..."
        :disabled="isLoading"
        v-model="caption"
        required
      />
      <FilePicker ref="filePicker" :disabled="isLoading" @change="selectFile" />
      <button :disabled="isLoading || !isFormValid">Post</button>
    </div>

    <div v-if="filePreviewURL" class="Preview">
      <img :src="filePreviewURL" alt="" />
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import * as uuid from 'uuid';
import { storage, functions } from '@lib/firebase';
import FilePicker from '@components/FilePicker.vue';
import defaultPhoto from '@assets/images/default-photo.jpg';

export default {
  components: {
    FilePicker,
  },

  data() {
    return {
      file: null,
      caption: '',
      isLoading: false,
    };
  },

  computed: {
    ...mapState(['currentUser']),

    currentUserPhotoURL() {
      return this.currentUser?.photoURL || defaultPhoto;
    },

    isFormValid() {
      return this.file && this.caption.length > 0;
    },

    filePreviewURL() {
      return this.file ? URL.createObjectURL(this.file) : null;
    },
  },

  methods: {
    selectFile(file) {
      this.file = file;
      if (!file) {
        this.caption = '';
      }
    },

    clearForm() {
      this.$refs.filePicker.clearFile();
    },

    async submitForm() {
      this.isLoading = true;
      this.$store.commit('clearError');

      const [successfulUploadPhoto, photoRef] = await this.uploadPhoto(this.file);
      if (!successfulUploadPhoto) {
        this.$store.commit('setError', 'Failed to upload photo. Please try again.');
        this.isLoading = false;
        return;
      }

      try {
        await functions.httpsCallable('createPost')({
          caption: this.caption,
          photoURL: await photoRef.getDownloadURL(),
        });
        this.clearForm();
      } catch (error) {
        console.error(error);
        this.$store.commit('setError', 'Failed to save post. Please try again.');
        await this.deletePhoto(photoRef);
      }

      this.isLoading = false;
    },

    async uploadPhoto(file) {
      const fileName = uuid.v4().replace(/-/g, '');
      const fileType = file.type.split('/')[1];
      const photoRef = storage.ref(`photos/${this.currentUser.uid}/${fileName}.${fileType}`);
      try {
        await photoRef.put(file);
        return [true, photoRef];
      } catch (error) {
        console.error(error);
        return [false, error];
      }
    },

    async deletePhoto(photoRef) {
      try {
        await photoRef.delete();
        return [true, photoRef];
      } catch (error) {
        console.error(error);
        return [false, error];
      }
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
