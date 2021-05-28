<template>
  <form class="NewPostForm" @submit.prevent="submitForm">
    <img class="Avatar" :src="currentUserPhotoURL" :alt="currentUser?.displayName" />

    <div class="Fields">
      <input type="text" name="caption" placeholder="Add a caption..." v-model="caption" required />
      <FilePicker ref="filePicker" @change="selectFile" />
      <button :disabled="!isFormValid">Post</button>
    </div>

    <img class="Preview" :src="filePreviewURL" alt="" />
  </form>
</template>

<script>
import { mapState } from 'vuex';
import * as uuid from 'uuid';
import firebase, { storage, db } from '@lib/firebase';
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
      const [successfulUploadPhoto, photoRef] = await this.uploadPhoto(this.file);
      if (!successfulUploadPhoto) {
        console.error(photoRef);
        return;
      }

      const postData = {
        caption: this.caption,
        photoURL: await photoRef.getDownloadURL(),
      };
      const [successfulCreatePost, postRef] = await this.createPost(postData);
      if (!successfulCreatePost) {
        console.error(postRef);
        await this.deletePhoto(photoRef);
        return;
      }

      this.clearForm();
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

    async createPost(data) {
      const postRef = db.collection('posts').doc();
      const userRef = db.doc(`users/${this.currentUser.uid}`);
      try {
        await db.runTransaction(async (t) => {
          const user = await t.get(userRef);
          t.set(postRef, {
            caption: data.caption,
            photoURL: data.photoURL,
            datePosted: firebase.firestore.FieldValue.serverTimestamp(),
            likesCount: 0,
            commentsCount: 0,
            latestComments: [],
            author: {
              id: this.currentUser.uid,
              displayName: this.currentUser.displayName,
              photoURL: this.currentUser.photoURL,
            },
          });
          t.update(userRef, {
            postsCount: user.data().postsCount + 1,
          });
        });
        return [true, postRef];
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
  width: 0;
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
  display: block;
  width: calc(100% + 3.2rem);
  margin: 0 -1.6rem;
}
</style>
