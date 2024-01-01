import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  label: string,
  margin: boolean,
}

const LabelWrapper = ({label, margin=true, children}: Props) => {
  return (
    <View style={margin ? styles.container : null}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default LabelWrapper;
