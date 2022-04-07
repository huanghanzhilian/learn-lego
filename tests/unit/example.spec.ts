import { shallowMount } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld.vue'
function sum(a: number, b: number) {
  return a + b;
}
describe('HelloWorld.vue', () => {
  // it('renders props.msg when passed', () => {
  //   const msg = 'new message'
  //   const wrapper = shallowMount(HelloWorld, {
  //     props: { msg }
  //   })
  //   expect(wrapper.text()).toMatch(msg)
  // })
  expect(sum(11, 2)).toBe(13);
})



test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
