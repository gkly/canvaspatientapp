import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon, Layout} from "@ui-kitten/components";
import {CATCH_ALL_ERROR_MESSAGE, COLORS} from "../utils/constants";
import Button from "./Button";

type Props = {
  message: string,
}

const ErrorText = ({isFullScreen=true, message=CATCH_ALL_ERROR_MESSAGE}: Props) => {
  const fullscreenStyling = isFullScreen ? {height:'100%'} : {};
  return (
    <View style={{...styles.container, ...fullscreenStyling}}>
      <View style={styles.messageBox}>
        <Icon style={styles.icon} name='alert-triangle-outline' fill={COLORS.WHITE} />
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageBox: {
    // borderWidth: 1,
    // borderColor: COLORS.RED,
    backgroundColor: COLORS.LIGHT_RED,
    width: '100%',
    borderRadius: 10,
    padding: 5,
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  message: {
    color: COLORS.WHITE,
    fontSize: 12,
    fontStyle: 'italic',
    // fontWeight: 'bold',
  },
});

export default ErrorText;
