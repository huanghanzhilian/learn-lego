<template>
  <component :is="tag" :style="styleProps" class="l-text-component" @click="handleClick">
    {{ text }}
  </component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import { pick } from "lodash-es";
import { transformToComponentProps, textDefaultProps, textStylePropNames } from "../defaultProps";
import useComponentCommon from "../hooks/useComponentCommon";
const defaultProps = transformToComponentProps(textDefaultProps);
export default defineComponent({
  name: "l-text",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    ...defaultProps
  },
  setup(props) {
    // 重用 简化
    // 抽离 获得styleProps
    const { styleProps, handleClick } = useComponentCommon(props, textStylePropNames);
    return {
      styleProps,
      handleClick
    };
  }
});
</script>

<style scoped>
.l-text-component {
  position: relative !important;
}
</style>
