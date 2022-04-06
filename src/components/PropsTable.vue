<template>
  <div class="props-table">
    <div v-for="(value, key) in finalProps" :key="key" class="prop-item">
      <span class="label" v-if="value.text">{{ value.text }}</span>
      <div class="prop-component">
        <component :is="value.component" v-if="value" :value="value.value" v-bind="value.extraProps">
          <template v-if="value.options">
            <component :is="value.subComponent" v-for="(option, key) in value.options" :key="key" :value="option.value">{{ option.text }}</component>
          </template>
        </component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, PropType, defineComponent } from "vue";
import { reduce } from "lodash";
import { PropsToForms, mapPropsToForms } from "../propsMap";
import { TextComponentProps } from "../defaultProps";

export default defineComponent({
  name: "props-table",
  props: {
    props: {
      type: Object as PropType<TextComponentProps>,
      required: true
    }
  },
  setup(props) {
    const finalProps = computed(() => {
      return reduce(
          props.props,
          (res, value, key) => {
            const newKey = key as keyof TextComponentProps;
            const item = mapPropsToForms[newKey];
            if (item) {
              item.value = item.initialTransform ? item.initialTransform(value) : value;
              res[newKey] = item;
            }
            return res;
          },
          {} as Required<PropsToForms>
      );
    });
    return {
      finalProps
    };
  }
});
</script>

<style lang="scss" scoped>
.prop-item {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}
.label {
  width: 28%;
}
.prop-component {
  width: 70%;
}
</style>
