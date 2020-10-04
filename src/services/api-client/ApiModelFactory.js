import {Comment} from "./models/Comment";
import {User} from "./models/User";
import {CanNotCreateModelError} from "./error/CanNotCreateModelError";

export class ApiModelFactory {
  /**
   * @param {object} data
   * @returns {Comment}
   */
  createCommentModel(data) {
    const comment = new Comment();

    try {
      const userData = {
        id: null,
        email: data.email,
        last_name: data.last_name,
        first_name: data.first_name,
        avatar: data.avatar,
      };

      comment.id = this.getValue(data, 'id');
      comment.text = this.getValue(data, 'text');
      comment.createdAt = this.getValue(data, 'created_at');
      comment.user = this.createUserModel(userData);
    } catch (error) {
      throw CanNotCreateModelError.create('Comment');
    }

    return comment;
  }

  /**
   * @param {object} data
   * @returns {User}
   */
  createUserModel(data) {
    const user = new User();

    try {
      user.id = this.getValue(data, 'id');
      user.email = this.getValue(data, 'email');
      user.firstName = this.getValue(data, 'first_name');
      user.lastName = this.getValue(data, 'last_name');
      user.avatar = this.getValue(data, 'avatar');
    } catch (error) {
      throw CanNotCreateModelError.create('User');
    }

    return user;
  }

  /**
   * @param {Object} data
   * @param {String} property
   * @returns {*}
   */
  getValue(data, property) {
    if (property in data) {
      return data[property];
    }

    throw new Error(`Missing property "${property}" in data`);
  }
}