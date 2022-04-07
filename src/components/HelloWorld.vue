<template>
  <h1>{{ msg }}</h1>
  <button @click="setCount">{{ count }}</button>
  <input type="text" v-model="todo">
  <button class="add-todo" @click="addTodo">add</button>
  <ul>
    <li v-for="(todo, index) in todos" :key="index">{{todo}}</li>
  </ul>
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
  emits: ['send'],
  setup(props, context) {
    console.log(props, context)
    const todo = ref('')
    const todos = ref([])
    const count = ref(0)
    const setCount = () => {
      count.value++
    }
    const addTodo = () => {
      if (todo.value) {
        todos.value.push(todo.value)
        context.emit('send', todo.value)
      }
    }
    return {
      count,
      todo,
      todos,
      setCount,
      addTodo
    }
  }
})

</script>

<style lang="scss" scoped>
.add-todo {
  display: block;
}
</style>
