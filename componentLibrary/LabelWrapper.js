import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  label: string,
}

const LabelWrapper = ({label, children}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default LabelWrapper;
