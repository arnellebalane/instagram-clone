<template>
  <div class="ProfilePage">
    <template v-if="userLoading">
      <ProfileHeaderLoading />
      <ProfileStatsLoading />
    </template>
    <template v-else>
      <ProfileHeader :user="user" />
      <ProfileStats :user="user" />
    </template>

    <ImageGridLoading v-if="postsLoading" />
    <ImageGrid v-else :posts="posts" />
  </div>
</template>

<script>
import { db } from '@lib/firebase';
import ProfileHeader from '@components/ProfileHeader.vue';
import ProfileStats from '@components/ProfileStats.vue';
import ImageGrid from '@components/ImageGrid.vue';
import ProfileHeaderLoading from '@components/ProfileHeaderLoading.vue';
import ProfileStatsLoading from '@components/ProfileStatsLoading.vue';
import ImageGridLoading from '@components/ImageGridLoading.vue';

export default {
  components: {
    ProfileHeader,
    ProfileStats,
    ImageGrid,
    ProfileHeaderLoading,
    ProfileStatsLoading,
    ImageGridLoading,
  },

  data() {
    return {
      user: null,
      posts: [],
      userLoading: true,
      postsLoading: true,
    };
  },

  mounted() {
    const userId = this.$route.params.id;

    this.unsubscribeUser = db.doc(`users/${userId}`).onSnapshot((doc) => {
      if (doc.exists) {
        this.user = { ...doc.data(), id: doc.id };
        this.userLoading = false;
      } else {
        this.$router.push({ name: 'not-found' });
      }
    });

    this.unsubscribePosts = db
      .collection('posts')
      .where('author.id', '==', userId)
      .orderBy('datePosted', 'desc')
      .onSnapshot((snapshot) => {
        this.posts = snapshot.docs
          .filter((doc) => !doc.metadata.hasPendingWrites)
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        this.postsLoading = false;
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
