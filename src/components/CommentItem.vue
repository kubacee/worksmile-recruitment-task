<template>
  <div class="comment-item">
    <user-avatar :url="avatarUrl" />
    <div class="comment-item__content">
      <div>
        <span class="comment-item__username">{{ username }}</span>:
        <span class="comment-item__text">{{ comment }}</span>
      </div>
      <div class="comment-item__date">
        {{ formatDate(commentDate) }}
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import UserAvatar from "./UserAvatar.vue";

  export default {
    name: "CommentItem",
    components: {UserAvatar},
    props: {
      avatarUrl: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      commentDate: {
        type: String,
        required: true,
      },
    },
    methods: {
      /**
       * @param dateValue
       * @returns {string}
       */
      formatDate(dateValue) {
        return moment(dateValue).fromNow();
      }
    }
  }
</script>

<style scoped lang="scss">
  @import './../scss/variables';

  .comment-item {
    display: flex;
    border-top: 1px solid $commentSeparatorColor;
    background: 1px solid $commentBackgroundColor;

    .comment-item__content {
      padding: 10px;
      font-size: 15px;
      color: $commentContentColor;
    }

    .comment-item__username {
      font-weight: bold;
    }

    .comment-item__date {
      font-size: 12px;
      margin-top: 20px;
      color: $commentDateColor
    }
  }
</style>