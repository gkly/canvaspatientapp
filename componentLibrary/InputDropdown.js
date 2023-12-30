import React from 'react';
import {Select, SelectItem} from "@ui-kitten/components";
import LabelWrapper from "./LabelWrapper";

type Props = {
  label: string,
  selectedIndex: number,
  value: string,
  onChange: () => void,
  optionNames: string[],
}

const InputDropdown = ({label, selectedIndex, value, onChange, optionNames}: Props) => {
  return (
    <LabelWrapper label={label}>
      <Select
        selectedIndex={selectedIndex}
        onSelect={onChange}
        value={value}
      >
        {optionNames.map(option => <SelectItem title={option} key={option} />)}
      </Select>
    </LabelWrapper>
  )
}

export default InputDropdown;
