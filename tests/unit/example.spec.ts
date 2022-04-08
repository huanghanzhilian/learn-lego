import {shallowMount, mount, flushPromises, VueWrapper} from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import Hello from '@/components/Hello.vue'

import axios from 'axios'

jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>
const msg = 'new message'
let wrapper: any
// describe描述一系列测试相关用例
describe('HelloWorld.vue', () => {
  beforeAll(() => {
    wrapper = shallowMount(HelloWorld, {
      props: { msg }
    })
  })
  it('renders props.msg when passed', () => {
    console.log(wrapper.html())
    console.log(wrapper.get('h1').text())
    console.log(wrapper.getComponent(Hello).props())
    expect(wrapper.get('h1').text()).toMatch(msg)
  })
  it('点击button时应该更新count', async () => {
    // 触发事件
    await wrapper.get('button').trigger('click')
    expect(wrapper.get('button').text()).toBe('1')
  })

  it('input有值，点击button时应该更新todos', async () => {
    const todoContent = 'buy milk'
    // 输入值
    await wrapper.get('input').setValue(todoContent)
    expect(wrapper.get('input').element.value).toBe(todoContent)
    await wrapper.get('.add-todo').trigger('click')
    expect(wrapper.findAll('li')).toHaveLength(1)
    console.log(wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('send')
    const events = wrapper.emitted('send') || []
    expect(events[0]).toEqual([todoContent])

  })

  it('点击load按钮时，应该加载user message', async () => {
    mockAxios.get.mockResolvedValueOnce({data: {username: 'hjp'}})
    await wrapper.get('.loadUser').trigger('click')
    expect(mockAxios.get).toHaveBeenCalled()
    expect(wrapper.find('.loading').exists()).toBeTruthy()
    await flushPromises()
    // 界面更新完毕

    expect(wrapper.find('.loading').exists()).toBeFalsy()
    expect(wrapper.get('.user-name').text()).toBe('hjp')
  })

  it.skip('点击load按钮时出现异常', async () => {
    mockAxios.get.mockRejectedValueOnce('error')
    await wrapper.get('.loadUser').trigger('click')
    expect(mockAxios.get).toHaveBeenCalled()
    expect(mockAxios.get).toHaveBeenCalledTimes(1)

    await flushPromises()
    // 界面更新完毕

    expect(wrapper.find('.loading').exists()).toBe(false)
    expect(wrapper.find('.error').exists()).toBe(true)
  })
  afterEach(() => {
    mockAxios.get.mockReset()
  })
})



function sum(a: number, b: number) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
