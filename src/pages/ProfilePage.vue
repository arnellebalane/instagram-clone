<template>
  <div class="ProfilePage">
    <template v-if="user">
      <ProfileHeader :user="user" />
      <ProfileStats :user="user" />
      <ImageGrid :posts="posts" />
    </template>
  </div>
</template>

<script>
import { db } from '@lib/firebase';
import ProfileHeader from '@components/ProfileHeader.vue';
import ProfileStats from '@components/ProfileStats.vue';
import ImageGrid from '@components/ImageGrid.vue';

export default {
  components: {
    ProfileHeader,
    ProfileStats,
    ImageGrid,
  },

  data() {
    return {
      user: null,
      posts: [],
    };
  },

  mounted() {
    this.unsubscribeUser = db.doc(`users/${this.$route.params.id}`).onSnapshot((doc) => {
      this.user = { ...doc.data(), id: doc.id };
    });

    this.unsubscribePosts = db
      .collection('posts')
      .where('author.id', '==', this.$route.params.id)
      .orderBy('datePosted', 'desc')
      .onSnapshot((snapshot) => {
        this.posts = snapshot.docs
          .filter((doc) => !doc.metadata.hasPendingWrites)
          .map((doc) => ({ ...doc.data(), id: doc.id }));
      });
  },

  unmounted() {
    this.unsubscribeUser();
    this.unsubscribePosts();
  },
};
</script>

<style scoped>
.ProfilePage {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}
</style>
