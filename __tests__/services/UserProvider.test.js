import '@babel/polyfill';
import {UserProvider} from "../../src/services/UserProvider";
import {ApiClient} from "../../src/services/api-client/ApiClient";
import userDataList from './userProviderData';
import {ApiModelFactory} from "../../src/services/api-client/ApiModelFactory";

describe('UserProvider.js', () => {
  let userProvider = null;

  const createUsersList = () => {
    const factory = new ApiModelFactory();
    return userDataList.map(item => factory.createUserModel(item));
  };

  beforeEach(() => {
    const users = createUsersList();

    ApiClient.prototype.fetchUsers = jest.fn();
    ApiClient.prototype.fetchUsers.mockReturnValue(Promise.resolve(users));

    userProvider = new UserProvider();
  });

  describe.each([
    ['', []],
    ['George', [1]],
    ['E', [3, 4]],
    ['e', [3, 4]],
    ['Mo', [5, 7, 8]],
    ['mor', [5, 7, 8]],
    ['morr', [5, 7]],
    ['morg', [8]],
  ])('search "%s" user', (searchValue, expectedUserIds) => {
    test(`should find (${expectedUserIds.length}) users`, async () => {
      const users = await userProvider.findUsers(searchValue);

      expect(users).toHaveLength(expectedUserIds.length);

      for (const expectedUserId of expectedUserIds) {
        const userResult = users.find(user => user.id === expectedUserId);
        expect(userResult).toBeDefined();
      }
    });
  });
});
