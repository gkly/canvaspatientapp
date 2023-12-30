import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Spinner} from "@ui-kitten/components";
import {PRIMARY_COLORS} from "../utils/constants";


const SpinnerWrapper = () => {
  // TODO (low) change spinner color
  return (
    <View style={styles.container}>
      <Spinner style={styles.spinner} />
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
  spinner: {
    // not working
    color: PRIMARY_COLORS.BLUE,
    fill: PRIMARY_COLORS.BLUE,
  }
});
