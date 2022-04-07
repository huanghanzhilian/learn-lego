<template>
  <div class="editor-container">
    <a-layout>
      <a-layout-sider width="300" style="background: #fff">
        <components-list :list="defaultTextTemplates" @on-item-click="addItem"></components-list>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <div class="preview-list" id="canvas-area">
            <edit-wrapper v-for="com in coms" :key="com.id" :id="com.id" @set-active="setActive" :active="com.id === (currentElement && currentElement.id)">
              <component :is="com.name" v-bind="com.props" />
              <a-button type="default" v-if="com.id === (currentElement && currentElement.id)" @click="deleteCurElement(currentElement.id)">删除</a-button>
            </edit-wrapper>
          </div>
        </a-layout-content>
      </a-layout>
      <a-layout-sider width="300" style="background: #fff" class="settings-panel">
        <props-table @change="handleChange" v-if="currentElement && currentElement.props" :props="currentElement.props"></props-table>
        <pre>
          {{ currentElement && currentElement.props }}
          </pre
          >
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store/index";
import { ComponentData } from "../store/editor";
import { defaultTextTemplates } from "../defaultTemplates";
import ComponentsList from "../components/ComponentsList.vue";
import EditWrapper from "../components/EditWrapper.vue";
import PropsTable from "../components/PropsTable.vue";
import LText from "../components/LText.vue";
import { Button } from "ant-design-vue";

export default defineComponent({
  name: "editor",
  components: {
    "a-button": Button,
    "edit-wrapper": EditWrapper,
    "l-text": LText,
    "components-list": ComponentsList,
    "props-table": PropsTable
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const coms = computed(() => store.state.editor.components);
    const currentElement = computed<ComponentData | null>(() => store.getters.getCurrentElement);
    const addItem = (props: any) => {
      store.commit("addComponent", props);
    };
    const deleteCurElement = (id: string) => {
      store.commit("deleteCurElement", id);
    };
    const setActive = (id: string) => {
      store.commit("setActive", id);
    };
    const handleChange = (e: any) => {
      store.commit("updateComponent", e);
    };
    return {
      coms,
      defaultTextTemplates,
      addItem,
      setActive,
      currentElement,
      handleChange,
      deleteCurElement
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
