<template>
  <div class="users-list">
    <slot />
  </div>
</template>

<script>
  export default {
    name: "UsersList"
  }
</script>

<style scoped lang="scss">
  .users-list {
    position: absolute;
    bottom: 100%;
    width: 100%;
    left: 0;
  }
</style>