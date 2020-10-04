import {ComponentModel} from "../test-utils/ComponentModel";

export class CommentItemModel extends ComponentModel {
  /**
   * @returns {string}
   */
  getAvatarUrl() {
    return this.wrapperComponent.find(".user-avatar__image").attributes('src');
  }

  /**
   * @returns {string}
   */
  getUsername() {
    return this.wrapperComponent.find(".comment-item__username").text();
  }

  /**
   * @returns {string}
   */
  getCommentText() {
    return this.wrapperComponent.find(".comment-item__text").text();
  }

  /**
   * @returns {string}
   */
  getCommentDate() {
    return this.wrapperComponent.find(".comment-item__date").text();
  }
}