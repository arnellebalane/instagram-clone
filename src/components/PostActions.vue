<template>
  <div class="PostActions">
    <button>
      <img src="@assets/icons/heart.svg" alt="Like" />
      Like
    </button>
    <button>
      <img src="@assets/icons/comment.svg" alt="Comment" />
      Comment
    </button>
    <button>
      <img src="@assets/icons/share.svg" alt="Share" />
      Share
    </button>
  </div>
</template>

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
