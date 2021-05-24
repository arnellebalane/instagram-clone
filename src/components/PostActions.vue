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
.PostActions {
  display: flex;
  gap: 4px;
  padding: 1.2rem 1.6rem;
}

button {
  width: 3.2rem;
  height: 3.2rem;
  padding: 4px;
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
