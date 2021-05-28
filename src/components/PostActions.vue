<template>
  <div class="PostActions">
    <button :disabled="disabled" @click="$emit('like')">
      <img v-if="liked" src="@assets/icons/heart-red.svg" alt="Like" />
      <img v-else src="@assets/icons/heart.svg" alt="Like" />
      Like
    </button>
    <button @click="$emit('comment')">
      <img src="@assets/icons/comment.svg" alt="Comment" />
      Comment
    </button>
    <button @click="$emit('share')">
      <img src="@assets/icons/share.svg" alt="Share" />
      Share
    </button>
  </div>
</template>

<script>
export default {
  props: {
    liked: Boolean,
    disabled: Boolean,
  },

  emits: ['like', 'comment', 'share'],
};
</script>

<style scoped>
div {
  display: flex;
  padding: 8px;
}

button {
  width: 3.8rem;
  height: 3.8rem;
  padding: 8px;
  border: none;
  font-size: 0;
  background: none;
  cursor: pointer;
}

img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
