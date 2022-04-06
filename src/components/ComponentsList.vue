<template>
  <div class="create-component-list">
    <div v-for="(item, index) in list" :key="index" @click="onItemClick(item)" class="component-item">
      <l-text v-bind="item"></l-text>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LText from "./LText.vue";
export default defineComponent({
  name: "components-list",
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  emits: ["on-item-click"],
  components: {
    LText
  },
  setup(props, context) {
    const onItemClick = (data: Array<object>) => {
      context.emit("on-item-click", data);
    };
    return {
      onItemClick
    };
  }
});
</script>

<style lang="scss">
.create-component-list {
}
</style>
