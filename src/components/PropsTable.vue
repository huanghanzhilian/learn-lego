<template>
  <div class="props-table">
    <div v-for="(value, key) in finalProps" :key="key" class="prop-item">
      <span class="label" v-if="value.text">{{ value.text }}</span>
      <div class="prop-component">
        <component :is="value.component" v-if="value" :[value.valueProp]="value.value" v-bind="value.extraProps" v-on="value.events">
          <template v-if="value.options">
            <component :is="value.subComponent" v-for="(option, key) in value.options" :key="key" :value="option.value">
              <render-vnode :vNode="option.text"></render-vnode>
            </component>
          </template>
        </component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, PropType, defineComponent, VNode } from "vue";
import { reduce } from "lodash";
import { mapPropsToForms } from "../propsMap";
import { TextComponentProps } from "../defaultProps";
import RenderVnode from "./RenderVnode";
interface FormProps {
  component: string;
  subComponent?: string;
  value: string;
  extraProps?: { [key: string]: any };
  text?: string;
  options?: { text: string | VNode; value: any }[];
  valueProp: string;
  eventName: string;
  events: { [key: string]: (e: any) => void };
}
export default defineComponent({
  name: "props-table",
  props: {
    props: {
      type: Object as PropType<TextComponentProps>,
      required: true
    }
  },
  components: {
    RenderVnode
  },
  emits: ["change"],
  setup(props, context) {
    const finalProps = computed(() => {
      return reduce(
          props.props,
          (res, value, key) => {
            const newKey = key as keyof TextComponentProps;
            const item = mapPropsToForms[newKey];
            if (item) {
              const { valueProp = "value", eventName = "change", initialTransform, afterTransform } = item;
              const newItem: FormProps = {
                ...item,
                value: initialTransform ? initialTransform(value) : value,
                valueProp,
                eventName,
                events: {
                  [eventName]: (e: any) => {
                    context.emit("change", { key, value: afterTransform ? afterTransform(e) : e });
                  }
                }
              };
              res[newKey] = newItem;
            }
            return res;
          },
          {} as { [key: string]: FormProps }
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
