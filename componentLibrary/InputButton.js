import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import ErrorText from "./ErrorText";
import Button from "./Button";

type Props = {
  placeholder?: string,
  value: string,
  onChange: () => void,
  onPress: () => void,
  disabled: boolean,
  errorMessage?: string,
}

const InputButton = ({placeholder, value, onChange, onPress, disabled, errorMessage}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          selectionColor='grey'
          value={value}
          placeholder={placeholder}
          onChangeText={onChange}
        />
        <Button
          style={styles.button}
          iconName='paper-plane-outline'
          type='outline'
          isSecondary={true}
          onPress={onPress}
          disabled={disabled}
        />
      </View>
      {errorMessage && <ErrorText message={errorMessage}/>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  input: {
    flex: 2,
    // minHeight: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgb(106,150,192)',
    marginRight: 5,
  },
  button: {
    borderRadius: 100,
  },
});

export default InputButton;
