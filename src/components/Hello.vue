<template>
  <h1>{{ msg }}</h1>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Hello',
  props: {
    msg: String
  }
})

</script>
