import '@babel/polyfill';
import {ApiClient} from "../../../src/services/api-client/ApiClient";
import axios from 'axios';
import userData from './userData'
import commentData from './commentData'
import {User} from "../../../src/services/api-client/models/User";
import {Comment} from "../../../src/services/api-client/models/Comment";

jest.mock('axios');

describe('ApiClient.js', () => {
  let apiClient = null;

  beforeEach(() => {
    apiClient = new ApiClient();
  });

  test('should fetch users', async () => {
    const data = {
      data: [userData, userData, userData],
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const results = await apiClient.fetchUsers();

    expect(results).toHaveLength(3);
    for (const item of results) {
      expect(item).toBeInstanceOf(User);
    }
  });

  test('should fetch comments', async () => {
    const data = {
      data: [commentData, commentData],
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const results = await apiClient.fetchComments();

    expect(results).toHaveLength(2);
    for (const item of results) {
      expect(item).toBeInstanceOf(Comment);
    }
  });

  test('should save comment', async () => {
    const textComment = 'FooBarBaz';
    const data = {
      data: {
        ...commentData,
        text: textComment,
      },
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(data));
    const comment = await apiClient.saveComment(textComment);

    expect(comment).toBeInstanceOf(Comment);
    expect(comment.text).toEqual(textComment);
  });
});
