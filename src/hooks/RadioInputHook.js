import {useState} from "react";

export default function useRadioInput({val}){
  let [checked, changeCheckbox] = useState(val);
  function onChange(val){
    changeCheckbox(val);
  };
  return {checked, onChange}
}
