<template>
  <h1>{{ msg }}</h1>
  <button @click="setCount">{{ count }}</button>
  <input type="text" v-model="todo">
  <button class="add-todo" @click="addTodo">add</button>

  <button class="loadUser" @click="loadUser">load</button>
  <p v-if="user.loading" class="loading">Loading</p>
  <div v-else class="user-name">{{user.data && user.data.username}}</div>
  <p v-if="user.error" class="error">error!</p>

  <ul>
    <li v-for="(todo, index) in todos" :key="index">{{todo}}</li>
  </ul>
  <Hello msg="1234" />
</template>

<script>
import axios from 'axios'
import { defineComponent, ref, reactive } from 'vue'
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
    const user = reactive({
      data: null,
      loading: false,
      error: false
    })
    const loadUser = () => {
      user.loading = true
      axios.get(`https://jsonplaceholder.typicode.com/users/1`).then(resp => {
        console.log(resp)
        user.data = resp.data
      }).catch(err => {
        user.error = true
      }).finally(() => {
        user.loading = false
      })
    }
    return {
      count,
      todo,
      todos,
      user,
      setCount,
      addTodo,
      loadUser
    }
  }
})

</script>

<style lang="scss" scoped>
.add-todo {
  display: block;
}
</style>
