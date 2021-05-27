<template>
  <div class="FeedPage">
    <NewPostForm />

    <FeedLoading v-if="postsLoading" />
    <Feed v-else :posts="posts" />
  </div>
</template>

<script>
import { db } from '@lib/firebase';
import NewPostForm from '@components/NewPostForm.vue';
import Feed from '@components/Feed.vue';
import FeedLoading from '@components/FeedLoading.vue';

export default {
  components: {
    NewPostForm,
    Feed,
    FeedLoading,
  },

  data() {
    return {
      posts: [],
      postsLoading: true,
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
        this.postsLoading = false;
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
