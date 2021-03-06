import { Module } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { GlobalDataProps } from "./index";
import { TextComponentProps } from "@/defaultProps";

export interface EditorProps {
  components: ComponentData[];
  currentElement: string;
}

export interface ComponentData {
  // 元素属性
  props: { [key: string]: string };
  // id
  id: string;
  // 业务组件库名称 l-text l-image
  name: string;
}

export const testComponents: ComponentData[] = [
  { id: uuidv4(), name: "l-text", props: { text: "hello", fontSize: "20px", color: "#000000", lineHeight: "1", textAlign: "left", fontFamily: "" } },
  { id: uuidv4(), name: "l-text", props: { text: "hello2", fontSize: "15px", fontWeight: "bold", lineHeight: "2", textAlign: "center", fontFamily: "" } },
  { id: uuidv4(), name: "l-text", props: { text: "hello3", fontSize: "10px", textAlign: "right", fontFamily: "" } }
];

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: ""
  },
  mutations: {
    addComponent(state, props) {
      const newComponent: ComponentData = {
        id: uuidv4(),
        name: "l-text",
        props
      };
      state.components.push(newComponent);
    },
    setActive(state, currentId: string) {
      state.currentElement = currentId;
    },
    updateComponent(state, { key, value }) {
      const updatedComponent = state.components.find(component => component.id === state.currentElement);
      if (updatedComponent) {
        updatedComponent.props[key as keyof TextComponentProps] = value;
      }
    },
    deleteCurElement(state, id) {
      const index = state.components.findIndex(item => {
        return item.id === id;
      });
      state.components.splice(index, 1);
    }
  },
  getters: {
    getCurrentElement: state => {
      return state.components.find(component => component.id === state.currentElement);
    }
  }
};

export default editor;
