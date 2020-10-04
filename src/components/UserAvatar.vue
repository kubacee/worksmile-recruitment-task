<template>
  <div
    class="user-avatar"
  >
    <img
      class="user-avatar__image"
      :src="url"
    >
  </div>
</template>

<script>
  export default {
    name: "UserAvatar",
    props: {
      url: {
        type: String,
        required: true,
      },
    }
  }
</script>

<style scoped lang="scss">
  .user-avatar {
    display: inline-block;
    padding: 10px;

    .user-avatar__image {
      border-radius: 50%;
      width: 50px;
    }
  }
</style>