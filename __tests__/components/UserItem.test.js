import {mount} from '@vue/test-utils';
import UserItem from '../../src/components/UserItem.vue'
import {UserItemModel} from "./UserItemModel";

describe('UserItem.vue', () => {
  test('should render avatar', () => {
    const username = 'Foo Bar';
    const selected = true;
    const avatarUrl = 'foobar';

    const component = mount(UserItem, {
      props: {
        username,
        selected,
        avatarUrl
      }
    });

    const componentModel = new UserItemModel(component);

    expect(componentModel.getAvatarUrl()).toBe(avatarUrl);
  });

  test('should render username', () => {
    const username = 'Foo Bar';
    const selected = true;
    const avatarUrl = 'foobar';

    const component = mount(UserItem, {
      props: {
        username,
        selected,
        avatarUrl
      }
    });

    const componentModel = new UserItemModel(component);

    expect(componentModel.getUsername()).toBe(username);
  });

  test('should render selected item', () => {
    const username = 'Foo Bar';
    const selected = true;
    const avatarUrl = 'foobar';

    const component = mount(UserItem, {
      props: {
        username,
        selected,
        avatarUrl
      }
    });

    const componentModel = new UserItemModel(component);

    expect(componentModel.isSelected()).toBeTruthy();
  });

  test('should render unselected item', () => {
    const username = 'Foo Bar';
    const selected = false;
    const avatarUrl = 'foobar';

    const component = mount(UserItem, {
      props: {
        username,
        selected,
        avatarUrl
      }
    });

    const componentModel = new UserItemModel(component);

    expect(componentModel.isSelected()).toBeFalsy();
  });
});
