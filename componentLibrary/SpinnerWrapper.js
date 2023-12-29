import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Spinner} from "@ui-kitten/components";


const SpinnerWrapper = () => {
  return (
    <View style={styles.container}>
      <Spinner />
    </View>
  )
}

export default SpinnerWrapper;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
  },
});
