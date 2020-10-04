import {mount} from '@vue/test-utils';
import CommentListItem from '../../src/components/CommentItem.vue'
import {CommentItemModel} from "./CommentItemModel";
import moment from 'moment';

describe('CommentItem.vue', () => {
  test('should render avatar', () => {
    const avatarUrl = 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg';
    const username = 'Foo Bar';
    const comment = 'Lorem ipsum';
    const commentDate = '2020-08-10 09:31:12';

    const component = mount(CommentListItem, {
      props: {
        avatarUrl,
        username,
        comment,
        commentDate
      }
    });

    const componentModel = new CommentItemModel(component);

    expect(componentModel.getAvatarUrl()).toBe(avatarUrl);
  });

  test('should render username', () => {
    const avatarUrl = 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg';
    const username = 'Foo Bar';
    const comment = 'Lorem ipsum';
    const commentDate = '2020-08-10 09:31:12';

    const component = mount(CommentListItem, {
      props: {
        avatarUrl,
        username,
        comment,
        commentDate
      }
    });

    const componentModel = new CommentItemModel(component);

    expect(componentModel.getUsername()).toBe(username);
  });

  test('should render comment text', () => {
    const avatarUrl = 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg';
    const username = 'Foo Bar';
    const comment = 'Lorem ipsum';
    const commentDate = '2020-08-10 09:31:12';

    const component = mount(CommentListItem, {
      props: {
        avatarUrl,
        username,
        comment,
        commentDate
      }
    });

    const componentModel = new CommentItemModel(component);

    expect(componentModel.getCommentText()).toBe(comment);
  });

  test('should render comment date', () => {
    const avatarUrl = 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg';
    const username = 'Foo Bar';
    const comment = 'Lorem ipsum';
    const commentDate = '2020-08-10 09:31:12';

    const component = mount(CommentListItem, {
      props: {
        avatarUrl,
        username,
        comment,
        commentDate
      }
    });

    const componentModel = new CommentItemModel(component);

    expect(componentModel.getCommentDate()).toBeDefined();
    expect(componentModel.getCommentDate()).not.toBe(commentDate);
  });

  describe.each([
    ['2020-08-10 11:30:00', '2020-08-10 10:30:00', 'pl', 'godzinę temu'],
    ['2020-08-10 13:30:00', '2020-07-10 10:30:00', 'pl', 'miesiąc temu'],
    ['2020-08-10 13:30:00', '2020-08-10 13:14:00', 'pl', '16 minut temu'],
    ['2020-08-10 14:30:00', '2020-08-10 13:15:00', 'pl', 'godzinę temu'],
  ])('format comment date (current:%s) (given:%s)', (currentDate, givenDate, locale, expected) => {
    const realDate = Date.now;

    beforeAll(() => {
      global.Date.now = jest.fn(() => new Date(currentDate).getTime())
    });

    afterAll(() => {
      global.Date.now = realDate
    });

    test(`should format date to (${expected})`, () => {
      moment.locale(locale);

      const avatarUrl = 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg';
      const username = 'Foo Bar';
      const comment = 'Lorem ipsum';

      const component = mount(CommentListItem, {
        props: {
          avatarUrl,
          username,
          comment,
          commentDate: givenDate
        }
      });

      const componentModel = new CommentItemModel(component);

      expect(componentModel.getCommentDate()).toBe(expected);
    });
  });
});
