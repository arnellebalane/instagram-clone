<template>
  <div class="FeedPage">
    <NewPostForm />
    <Feed :posts="posts" />
  </div>
</template>

<script>
import { db } from '@lib/firebase';
import NewPostForm from '@components/NewPostForm.vue';
import Feed from '@components/Feed.vue';

export default {
  components: {
    NewPostForm,
    Feed,
  },

  data() {
    return {
      posts: [],
    };
  },

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
};
</script>

<style scoped>
.NewPostForm {
  margin-bottom: 2.4rem;
}
</style>
