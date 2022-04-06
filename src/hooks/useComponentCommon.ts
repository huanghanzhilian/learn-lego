/* eslint-disable */
import { reactive } from "vue";
import { pick } from "lodash-es";

const useComponentCommon = <T extends { [key: string]: any }>(props: T, picks: string[]) => {
  const styleProps = reactive(pick(props, picks));
  const handleClick = () => {
    if (props.actionType === "url" && props.url) {
      window.location.href = props.url;
    }
  };
  return {
    styleProps,
    handleClick
  };
};

export default useComponentCommon;
