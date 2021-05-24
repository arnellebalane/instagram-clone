<template>
  <div class="ProfilePage">
    <ProfileHeader :user="user" />
    <ProfileStats :user="user" />
  </div>
</template>

<script>
import ProfileHeader from '@components/ProfileHeader.vue';
import ProfileStats from '@components/ProfileStats.vue';

export default {
  components: {
    ProfileHeader,
    ProfileStats,
  },

  data() {
    return {
      user: {
        id: 'abc123',
        name: 'Arnelle Balane',
        email: 'arnellebalane@gmail.com',
        photoURL: 'https://lh3.googleusercontent.com/a-/AOh14GgvGHJODi4nZbu_nj5UCVirg3aR0jpzkHgJvAr2og=s96-c',
        postsCount: 10,
        followersCount: 100,
        followingCount: 20,
        description: 'Software Developer, Newlogic',
      },
    };
  },
};
</script>

<style scoped>
.ProfileHeader {
  margin-bottom: 2.4rem;
}
</style>
