import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon, Layout} from "@ui-kitten/components";

type Props = {
  message: string,
}

const ErrorText = ({message}: Props) => {
  return (
    <>
      <View style={styles.line} />
      <Layout style={styles.container}>
        <Icon style={styles.icon} name='alert-triangle-outline' />
        <Text style={styles.message}>{message}</Text>
      </Layout>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  message: {
    color: 'red',
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 15,
    marginBottom: 15,
  }
});

export default ErrorText;
