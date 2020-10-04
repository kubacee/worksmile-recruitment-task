import {ComponentModel} from "../test-utils/ComponentModel";

export class UserItemModel extends ComponentModel {
  /**
   * @returns {string}
   */
  getUsername() {
    return this.wrapperComponent.find(".user-item__username").text();
  }

  /**
   * @returns {boolean}
   */
  isSelected() {
    return this.wrapperComponent.find(".user-item--selected").exists();
  }

  /**
   * @returns {string}
   */
  getAvatarUrl() {
    return this.wrapperComponent.find(".user-avatar__image").attributes('src');
  }
}