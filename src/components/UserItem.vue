<template>
  <div
    class="user-item"
    :class="{'user-item--selected': selected}"
    @click="$emit('click')"
  >
    <user-avatar :url="avatarUrl" />
    <span class="user-item__username">{{ username }}</span>
  </div>
</template>

<script>
  import UserAvatar from "./UserAvatar.vue";

  export default {
    name: "UserItem",
    components: {UserAvatar},
    props: {
      username: {
        type: String,
        required: true,
      },
      avatarUrl: {
        type: String,
        required: true,
      },
      selected: {
        type: Boolean,
        required: false,
        default: false,
      }
    },
    emits: ['click'],
  }
</script>

<style scoped lang="scss">
  @import './../scss/variables';

  .user-item {
    cursor: pointer;
    display: flex;
    border-top: 1px solid $commentSeparatorColor;
    align-items: center;

    &.user-item--selected {
      background: $layoutBackground;

      .user-item__username {
        font-weight: bold;
      }
    }
  }
</style>