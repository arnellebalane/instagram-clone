<template>
  <div class="PostActions">
    <button>
      <img src="@assets/icons/heart.svg" alt="Share" />
    </button>
    <button>
      <img src="@assets/icons/comment.svg" alt="Share" />
    </button>
    <button>
      <img src="@assets/icons/share.svg" alt="Share" />
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
  background: none;
  cursor: pointer;
}

img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
