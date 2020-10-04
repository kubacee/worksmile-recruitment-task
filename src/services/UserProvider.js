import {ApiClient} from "./api-client/ApiClient";
import {User} from "./api-client/models/User";

export class UserProvider {
  constructor() {
    this.apiClient = new ApiClient();
  }

  /**
   * return fake current user
   *
   * @returns {User}
   */
  getCurrentUser() {
    const user = new User();

    user.email = 'charles.morris@reqres.in';
    user.firstName = 'Charles';
    user.lastName = 'Morris';
    user.avatar = 'https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg';

    return user;
  }

  /**
   * @param {string|null} searchValue
   * @returns {Promise<User|Array*>}
   */
  async findUsers(searchValue) {
    let filterResults = [];

    if (!searchValue) {
      return filterResults;
    }

    /**
     * @param {string} string
     * @param {string} searchValue
     * @returns {boolean}
     */
    const checkSearchValue = (string, searchValue) => {
      return string.toLowerCase().indexOf(searchValue.toLowerCase()) === 0
    };

    const users = await this.apiClient.fetchUsers();

    filterResults = users.filter(userModel => {
      const lastNameMatch = checkSearchValue(userModel.lastName, searchValue);
      const firstNameMatch = checkSearchValue(userModel.firstName, searchValue);

      return firstNameMatch || lastNameMatch;
    });

    return filterResults;
  }
}