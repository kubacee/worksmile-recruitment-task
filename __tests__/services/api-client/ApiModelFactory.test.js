import commentData from './commentData'
import userData from './userData'
import {ApiModelFactory} from "../../../src/services/api-client/ApiModelFactory";
import {Comment} from "../../../src/services/api-client/models/Comment";
import {User} from "../../../src/services/api-client/models/User";
import {CanNotCreateModelError} from "../../../src/services/api-client/error/CanNotCreateModelError";

describe('ApiModelFactory.js', () => {
  let modelFactory = null;

  beforeEach(() => {
    modelFactory = new ApiModelFactory();
  });

  test('should create user model', () => {
    const userModel = modelFactory.createUserModel(userData);
    expect(userModel).toBeInstanceOf(User);
  });

  test('should create comment model', () => {
    const commentModel = modelFactory.createCommentModel(commentData);
    expect(commentModel).toBeInstanceOf(Comment);
    expect(commentModel.user).toBeInstanceOf(User);
  });

  test('should throw error when create user model with incorrect data', () => {
    expect(() => {
      const data = {};
      modelFactory.createUserModel(data);
    }).toThrowError(CanNotCreateModelError);
  });

  test('should throw error when create comment model with incorrect data', () => {
    expect(() => {
      const data = {};
      modelFactory.createCommentModel(data);
    }).toThrowError(CanNotCreateModelError);
  })
});
