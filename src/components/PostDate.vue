<template>
  <div class="PostDate">
    <RouterLink :to="{ name: 'post', params: { id: post.id } }">
      <time :datetime="post.datePosted.toISOString()">{{ datePosted }}</time>
    </RouterLink>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  computed: {
    datePosted() {
      return dayjs(this.post.datePosted).fromNow();
    },
  },
};
</script>

<style scoped>
div {
  padding: 0 1.6rem;
}

time {
  font-size: 1rem;
  text-transform: uppercase;
  color: var(--gray-500);
}
</style>
