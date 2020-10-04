import {ComponentModel} from "../test-utils/ComponentModel";

export class UserAvatarModel extends ComponentModel {
  /**
   * @returns {string}
   */
  getAvatarUrl() {
    return this.wrapperComponent.find(".user-avatar__image").attributes('src');
  }
}