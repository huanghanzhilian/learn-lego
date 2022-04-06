<template>
  <component :is="tag" :style="styleProps" class="l-text-component">
    {{ text }}
  </component>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { pick } from "lodash-es";
export default defineComponent({
  name: "l-text",
  props: {
    text: {
      type: String,
    },
    fontSize: {
      type: String,
    },
    tag: {
      type: String,
      default: "div",
    },
  },
  setup(props) {
    // 重用 简化
    // 抽离 获得styleProps
    const styleProps = reactive(pick(props, ["fontSize"]));
    return {
      styleProps,
    };
  },
});
</script>

<style scoped></style>
