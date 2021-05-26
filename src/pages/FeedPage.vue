<template>
  <div class="FeedPage">
    <NewPostForm ref="newPostForm" :disabled="isLoading" @submit="submitPost" />
    <Feed :posts="posts" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import firebase, { db, storage } from '@lib/firebase';
import NewPostForm from '@components/NewPostForm.vue';
import Feed from '@components/Feed.vue';

export default {
  components: {
    NewPostForm,
    Feed,
  },

  data() {
    return {
      isLoading: false,
      posts: [],
    };
  },

  computed: mapState(['currentUser']),

  mounted() {
    this.unsubscribe = db
      .collection('posts')
      .orderBy('datePosted', 'desc')
      .onSnapshot((snapshot) => {
        this.posts = snapshot.docs
          .filter((doc) => !doc.metadata.hasPendingWrites)
          .map((doc) => ({ ...doc.data(), id: doc.id }));
      });
  },

  unmounted() {
    this.unsubscribe();
  },

  methods: {
    async submitPost(data) {
      this.isLoading = true;
      this.$store.commit('clearError');

      const postRef = db.collection('posts').doc();
      const [successfulPhotoUpload, photoRef] = await this.uploadPhoto(postRef.id, data.file);
      if (!successfulPhotoUpload) {
        this.$store.commit('setError', 'Failed to upload the photo. Please try again.');
        this.isLoading = false;
        return;
      }

      const [successfulSavePost] = await this.savePost(postRef, photoRef, data);
      if (!successfulSavePost) {
        this.$store.commit('setError', 'Failed to save post. Please try again.');
        await this.deletePhoto(photoRef);
        this.isLoading = false;
        return;
      }

      this.$refs.newPostForm.clearForm();
      this.isLoading = false;
    },

    async uploadPhoto(fileName, file) {
      const photoType = file.type.split('/')[1];
      const photoRef = storage.ref(`photos/${this.currentUser.uid}/${fileName}.${photoType}`);
      try {
        await photoRef.put(file);
        return [true, photoRef];
      } catch (error) {
        console.error(error);
        return [false, error];
      }
    },

    async savePost(postRef, photoRef, data) {
      try {
        const postData = {
          caption: data.caption,
          photoURL: await photoRef.getDownloadURL(),
          datePosted: firebase.firestore.FieldValue.serverTimestamp(),
          author: {
            id: this.currentUser.uid,
            displayName: this.currentUser.displayName,
            photoURL: this.currentUser.photoURL,
          },
        };
        await postRef.set(postData);
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
.NewPostForm {
  margin-bottom: 2.4rem;
}
</style>
