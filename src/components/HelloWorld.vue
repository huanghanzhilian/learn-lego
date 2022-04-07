<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">{{ count }}</button>
  <Hello msg="1234" />
</template>

<script>
import { defineComponent, ref } from 'vue'
import Hello from './Hello'

export default defineComponent({
  name: 'HelloWorld',
  components: {
    Hello
  },
  props: {
    msg: String
  },
  setup() {
    const count = ref(0)
    return {
      count
    }
  }
})

</script>
