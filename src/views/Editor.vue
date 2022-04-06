<template>
  <div class="editor-container">
    <a-layout>
      <a-layout-sider width="300" style="background: yellow">
        <components-list :list="defaultTextTemplates" @on-item-click="addItem"></components-list>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <div class="preview-list" id="canvas-area">
            <component v-for="com in coms" :key="com.id" :is="com.name" v-bind="com.props" />
          </div>
        </a-layout-content>
      </a-layout>
      <a-layout-sider width="300" style="background: purple" class="settings-panel"> 组件属性 </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store/index";
import { defaultTextTemplates } from "../defaultTemplates";
import ComponentsList from "../components/ComponentsList.vue";
import LText from "../components/LText.vue";

export default defineComponent({
  name: "editor",
  components: {
    "l-text": LText,
    "components-list": ComponentsList
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const coms = reactive(store.state.editor.components);
    const addItem = (props: any) => {
      store.commit("addComponent", props);
    };
    return {
      coms,
      defaultTextTemplates,
      addItem
    };
  }
});
</script>

<style>
.editor-container .preview-container {
  padding: 24px;
  margin: 0;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.editor-container .preview-list {
  padding: 0;
  margin: 0;
  min-width: 375px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}
</style>
