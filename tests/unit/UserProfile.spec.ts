import { mount } from "@vue/test-utils";
import UserProfile from "@/components/UserProfile.vue";
import { message } from 'ant-design-vue'
import store from '@/store/index'

let wrapper: any;
jest.mock("ant-design-vue", () => ({
  message: {
    success: jest.fn()
  }
}));
// jest.mock("vuex");

const mockedRoutes: string[] = []
jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: (url: string) => mockedRoutes.push(url)
  })
}));

const mockComponent = {
  template: '<div><slot></slot></div>'
}

const mockComponent2 = {
  template: '<div><slot></slot><slot name="overlay"></slot></div>'
}

const globalComponents = {
  'a-button': mockComponent,
  'a-dropdown-button': mockComponent2,
  'router-link': mockComponent,
  'a-menu': mockComponent,
  'a-menu-item': mockComponent
}

describe("UserProfile component", () => {
  beforeAll(async () => {
    jest.useFakeTimers('legacy')
    wrapper = mount(UserProfile, {
      props: {
        user: {
          isLogin: false
        }
      },
      global: {
        components: globalComponents,
        provide: {
          store
        }
      }
    });
  });
  it("should render login button when login is false", async () => {
    console.log(wrapper.html());
    expect(wrapper.get('div').text()).toBe('登录')
    await wrapper.get('div').trigger('click')
    expect(message.success).toHaveBeenCalled()
    console.log(store.state.user.userName)
    expect(store.state.user.userName).toBe('hjp')
  });
  it("should render username when login is true", async() => {
    await wrapper.setProps({
      user: {
        isLogin: true,
        userName: 'hjp'
      }
    })
    console.log(wrapper.html());
    expect(wrapper.get('.user-profile-component').html()).toContain('hjp')
    expect(wrapper.find('.user-profile-dropdown').exists()).toBeTruthy()

  });
  it("执行退出和显示message，执行延时路由跳转", async() => {
    await wrapper.get('.user-profile-dropdown div').trigger('click')
    console.log(store.state.user.isLogin)
    expect(store.state.user.isLogin).toBeFalsy()
    expect(message.success).toHaveBeenCalledTimes(1)
    jest.runAllTimers()
    expect(mockedRoutes).toEqual(['/'])
  });
  afterEach(() => {
    (message as jest.Mocked<typeof message>).success.mockReset()
  });
});

