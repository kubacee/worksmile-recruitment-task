import axios from 'axios';
import {ApiModelFactory} from "./ApiModelFactory";
import moment from 'moment';

export class ApiClient {
  constructor() {
    this.apiUrl = {
      getComments: 'https://my-json-server.typicode.com/zaszczyk/demo/comments',
      createComment: 'https://my-json-server.typicode.com/zaszczyk/demo/comments',
      getUsers: 'https://my-json-server.typicode.com/zaszczyk/demo/users',
    };
    this.modelFactory = new ApiModelFactory();
  }

  /**
   * @returns {Promise<Comment|Array>}
   */
  async fetchComments() {
    const {data} = await axios.get(this.apiUrl.getComments);
    return data.map(item => this.modelFactory.createCommentModel(item));
  }

  /**
   * @returns {Promise<User|Array>}
   */
  async fetchUsers() {
    const {data} = await axios.get(this.apiUrl.getUsers);
    return data.map(item => this.modelFactory.createUserModel(item));
  }

  /**
   * @param {string} commentText
   * @returns {Promise<Comment>}
   */
  async saveComment(commentText) {
    const payload = {
      text: commentText
    };
    const {data} = await axios.post(this.apiUrl.createComment, payload);

    // @todo - get comment data from api
    const commentData = {
      id: data.id,
      text: data.text,
      created_at: moment.now('YYYY-MM-DD HH:ii:ss'),
      email: "charles.morris@reqres.in",
      first_name: "Charles",
      last_name: "Morris",
      avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
    };

    return this.modelFactory.createCommentModel(commentData);
  }
}