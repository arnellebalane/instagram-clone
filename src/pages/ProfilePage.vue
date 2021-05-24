<template>
  <div class="ProfilePage">
    <ProfileHeader :user="user" />
    <ProfileStats :user="user" />
    <ImageGrid :posts="posts" />
  </div>
</template>

<script>
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

      posts: new Array(12).fill(0).map((i) => ({
        id: `abc123${i}`,
        photoURL:
          'https://images.unsplash.com/photo-1621716362967-fd1c5281eef9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500',
        caption: 'This is a cool photo',
        likesCount: 10,
        datePosted: new Date('2021-05-01 03:14:00'),
        comments: [
          {
            id: 'abcde12345',
            body: 'this looks so cool!',
            datePosted: new Date('2021-05-02 05:12:21'),
            author: {
              id: 'abcdef123456',
              name: 'Random User',
            },
          },
        ],
        author: {
          id: 'abcd1234',
          name: 'Arnelle Balane',
          photoURL: 'https://lh3.googleusercontent.com/a-/AOh14GgvGHJODi4nZbu_nj5UCVirg3aR0jpzkHgJvAr2og=s96-c',
        },
      })),
    };
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
