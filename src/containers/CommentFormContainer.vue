<template>
  <loader v-if="comment.loader" />
  <comment-form
    v-model="comment.text"
    :users-list="users.list"
    :user-avatar="currentUserAvatar"
    @submit-form="submitComment"
    @search-users="searchUsers"
    @clear-users="clearUsers"
  />
</template>

<script>
  import CommentForm from "../components/CommentForm.vue";
  import {ApiClient} from "../services/api-client/ApiClient";
  import Loader from "../components/Loader.vue";
  import {UserProvider} from "../services/UserProvider";
  import {debounce} from 'lodash';

  export default {
    name: "CommentFormContainer",
    components: {Loader, CommentForm},
    emits: ['add-new-comment'],
    data() {
      return {
        comment: {
          loader: false,
          text: null,
        },
        users: {
          list: [],
        },
      }
    },
    computed: {
      /**
       * @returns {string}
       */
      currentUserAvatar() {
        return this.userProvider.getCurrentUser().avatar;
      }
    },
    created() {
      this.apiClient = new ApiClient();
      this.userProvider = new UserProvider();
    },
    methods: {
      /**
       * @returns {Promise<void>}
       */
      async submitComment() {
        if (!this.comment.text) {
          return;
        }

        this.comment.loader = true;

        const commentModel = await this.apiClient.saveComment(this.comment.text);

        this.comment.loader = false;
        this.comment.text = null;

        this.$emit('add-new-comment', commentModel);
      },

      searchUsers: debounce(async function(searchValue) {
        if (null === searchValue) {
          this.clearUsers();
          return;
        }

        this.users.list = await this.userProvider.findUsers(searchValue);
      }, 300),

      clearUsers() {
        this.users.list = [];
      }
    },
  }
</script>