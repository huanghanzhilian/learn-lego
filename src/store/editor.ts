import { Module } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { GlobalDataProps } from "./index";

export interface EditorProps {
  components: ComponentData[];
  currentElement: string;
}

interface ComponentData {
  // 元素属性
  props: { [key: string]: string };
  // id
  id: string;
  // 业务组件库名称 l-text l-image
  name: string;
}

export const testComponents: ComponentData[] = [
  { id: uuidv4(), name: "l-text", props: { text: "hello", fontSize: "20px", color: "red" } },
  { id: uuidv4(), name: "l-text", props: { text: "hello2", fontSize: "15px", fontWeight: "bold" } },
  { id: uuidv4(), name: "l-text", props: { text: "hello3", fontSize: "10px" } },
];

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: "",
  },
};

export default editor;
