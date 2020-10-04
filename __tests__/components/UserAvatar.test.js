import {mount} from '@vue/test-utils';
import UserAvatar from '../../src/components/UserAvatar.vue'
import {UserAvatarModel} from "./UserAvatarModel";

describe('UserAvatar.vue', () => {
  test('should render avatar', () => {
    const url = 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg';

    const component = mount(UserAvatar, {
      props: {
        url
      }
    });

    const componentModel = new UserAvatarModel(component);

    expect(componentModel.getAvatarUrl()).toBe(url);
  });
});
