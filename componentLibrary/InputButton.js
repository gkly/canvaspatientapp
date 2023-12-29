import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button, Icon} from "@ui-kitten/components";
import ErrorText from "./ErrorText";

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
          style={disabled ? styles.disabledButton : styles.activeButton}
          appearance='ghost'
          accessoryRight={<Icon name='paper-plane-outline' />} // TODO generalize
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
    minHeight: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgb(106,150,192)',
  },
  activeButton: {
    borderRadius: 100,
    borderColor: 'rgb(106,150,192)',
    width: 50,
    height: 50,
    marginLeft: 5,
  },
  disabledButton: {
    borderRadius: 100,
    width: 50,
    height: 50,
    marginLeft: 5,
  }
});

export default InputButton;
