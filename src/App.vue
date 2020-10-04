<template>
  <layout>
    <template #content>
      <loader v-if="comments.loader" />
      <comment-item
        v-for="comment in comments.list"
        :key="`comment${comment.id}`"
        :comment="comment.text"
        :comment-date="comment.createdAt"
        :avatar-url="comment.user.avatar"
        :username="comment.user.fullname"
      />
    </template>
    <template #form>
      <comment-form-container
        @add-new-comment="addNewComment"
      />
    </template>
  </layout>
</template>

<script>
  import Layout from "./components/Layout.vue";
  import CommentItem from "./components/CommentItem.vue";
  import {ApiClient} from "./services/api-client/ApiClient";
  import CommentFormContainer from "./containers/CommentFormContainer.vue";
  import Loader from "./components/Loader.vue";

  export default {
    name: 'App',
    components: {
      Loader,
      CommentFormContainer,
      CommentItem,
      Layout
    },
    data() {
      return {
        comments: {
          loader: false,
          list: [],
        },
      }
    },
    created() {
      this.apiClient = new ApiClient();
    },
    mounted() {
      this.fetchComments();
    },
    methods: {
      async fetchComments() {
        this.comments.loader = true;

        this.comments.list = await this.apiClient.fetchComments();

        this.comments.loader = false;
      },

      addNewComment(comment) {
        this.comments.list.push(comment)
      },
    },
  };
</script>
