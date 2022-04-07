import { shallowMount, mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import Hello from '@/components/Hello.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg }
    })
    console.log(wrapper.html())
    console.log(wrapper.get('h1').text())
    console.log(wrapper.getComponent(Hello).props())
    expect(wrapper.get('h1').text()).toMatch(msg)
  })
  it('点击button时应该更新count', async () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg }
    })
    // 触发事件
    await wrapper.get('button').trigger('click')
    expect(wrapper.get('button').text()).toBe('1')
  })

  it('input有值，点击button时应该更新todos', async () => {
    const msg = 'new message'
    const todoContent = 'buy milk'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg }
    })
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

})


function sum(a: number, b: number) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
