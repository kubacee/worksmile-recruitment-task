<template>
  <form
    class="comment-form"
    @submit.prevent="addComment"
  >
    <users-list v-if="showUserList">
      <user-item
        v-for="(user, index) in usersList"
        :key="`user${user.id}`"
        :selected="index === selectedUserIndex"
        :avatar-url="user.avatar"
        :username="user.fullname"
        @click="replaceSelectedMention(index)"
      />
    </users-list>

    <comment-avatar :url="userAvatar" />
    <textarea
      ref="textarea"
      v-model="comment"
      class="comment-form__textarea"
      :placeholder="$t('commentForm.placeholder')"
      @input="checkMentionSign"
    />
    <button
      type="submit"
      class="comment-form__submit"
    >
      {{ $t('commentForm.submitButton') }}
    </button>
  </form>
</template>

<script>
  import CommentAvatar from "./UserAvatar.vue";
  import UsersList from "./UsersList.vue";
  import UserItem from "./UserItem.vue";
  export default {
    name: "CommentForm",
    components: {UserItem, UsersList, CommentAvatar},
    props: {
      modelValue: {
        type: String,
        required: true
      },
      userAvatar: {
        type: String,
        required: true,
      },
      mentionKey: {
        type: String,
        required: false,
        default: '@'
      },
      mentionProperty: {
        type: String,
        required: false,
        default: 'fullname'
      },
      usersList: {
        type: Array,
        required: false,
        default: () => [],
      },
    },
    emits: [
      'clear-users',
      'submit-form',
      'update:modelValue',
      'search-users',
    ],
    data() {
      return {
        lastSign: null,
        mentionSearchValue: null,
        selectedUserIndex: 0,
      }
    },
    computed: {
      comment: {
        set(value) {
          this.$emit('update:modelValue', value)
        },
        get() {
          return this.modelValue;
        }
      },
      showUserList() {
        return this.usersList.length > 0;
      }
    },
    mounted() {
      this.registerEvents();
    },
    methods: {
      addComment() {
        this.$emit('submit-form');
      },

      checkMentionSign(event) {
        const sign = event.data;
        this.selectedUserIndex = 0;

        const stopWatchingMention = () => sign === ' ';
        const emitSearchUserEvent = () => this.$emit('search-users', this.mentionSearchValue);
        const updateMentionString = () => this.lastSign === this.mentionKey && sign !== this.mentionKey;
        const removeLastCharacterFromMentionString = () => sign === null && this.mentionSearchValue;

        if (removeLastCharacterFromMentionString()) {
          this.mentionSearchValue = this.mentionSearchValue.slice(0, -1);
          emitSearchUserEvent();
          return;
        }

        if (stopWatchingMention()) {
          this.resetMention();
          emitSearchUserEvent();
          return;
        }

        if (updateMentionString()) {
          this.mentionSearchValue = this.mentionSearchValue === null
            ? sign
            : this.mentionSearchValue + sign
          ;
          emitSearchUserEvent();
          return;
        }

        this.lastSign = sign;
        this.mentionSearchValue = null;
      },

      cancelKeyEvent(event) {
        event.preventDefault();
        event.stopPropagation();
      },

      onKeyDown (event) {
        const isArrowDownKey = event.key === 'ArrowDown' || event.keyCode === 40;
        const isArrowUpKey = event.key === 'ArrowUp' || event.keyCode === 38;
        const isEscapeKey = event.key === 'Escape' || event.keyCode === 27;
        const isEnterKey = event.key === 'Enter' || event.keyCode === 13;

        if (isArrowDownKey) {
          this.selectedUserIndex++;

          if (this.selectedUserIndex >= this.usersList.length) {
            this.selectedUserIndex = 0
          }

          this.cancelKeyEvent(event)
        }

        if (isArrowUpKey) {
          this.selectedUserIndex--;

          if (this.selectedUserIndex < 0) {
            this.selectedUserIndex = this.usersList.length - 1
          }

          this.cancelKeyEvent(event)
        }

        if (isEnterKey) {
          this.replaceSelectedMention(this.selectedUserIndex);
          this.cancelKeyEvent(event)
        }

        if (isEscapeKey) {
          this.closeUserList();
          this.cancelKeyEvent(event)
        }
      },

      closeUserList() {
        this.$emit('clear-users');
      },

      replaceSelectedMention(userIndex) {
        const user = this.usersList[userIndex];
        const searchValue = '@' + this.mentionSearchValue;
        const replaceValue = user[this.mentionProperty] + ' ';

        this.comment = this.comment.replace(searchValue, replaceValue);

        this.resetMention();
        this.closeUserList();
      },

      resetMention() {
        this.lastSign = null;
        this.mentionSearchValue = null;
      },

      registerEvents() {
        this.$refs.textarea.addEventListener('keydown', this.onKeyDown)
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "./../scss/variables";

  .comment-form {
    display: flex;
    position: relative;

    .comment-form__textarea {
      width: 100%;
      font-family: inherit;
      border-radius: 0;
      border: 1px solid $commentTextareaBorderColor;
      outline: none;
    }

    .comment-form__submit {
      background: none;
      color: $commentSubmitButtonColor;
      outline: none;
      border: none;
      font-weight: bold;
      cursor: pointer;
    }
  }
</style>