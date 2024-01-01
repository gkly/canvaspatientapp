import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import {InputModeOptions} from "react-native";
import LabelWrapper from "./LabelWrapper";

type Props = {
  label: string,
  placeholder?: string,
  value: string,
  onChange: () => void,
  disabled: boolean,
  isSecureText: boolean,
  inputMode?: InputModeOptions,
}

const InputText = ({label, placeholder, value, onChange, disabled, isSecureText = false, inputMode}: Props) => {

  return (
    <LabelWrapper label={label}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={onChange}
        secureTextEntry={isSecureText}
        inputMode={inputMode}
        disabled={disabled}
      />
    </LabelWrapper>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    minWidth: 250,
  },
});

export default InputText;
