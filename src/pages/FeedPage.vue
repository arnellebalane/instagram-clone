<template>
  <div class="FeedPage">
    <NewPostForm />
  </div>
</template>

<script>
import NewPostForm from '@components/NewPostForm.vue';

export default {
  components: {
    NewPostForm,
  },
};
</script>

<style scoped>
.NewPostForm {
  margin-bottom: 2.4rem;
}
</style>
