import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from "@ui-kitten/components";
import {SECONDARY_COLORS} from "../utils/constants";

type Props = {
  name: string,
  plural: boolean,
}

const EmptyText = ({name, plural}: Props) => {
  const isAre = plural ? 'are' : 'is';

  return (
    <View style={styles.container}>
      <Icon name='search-outline' style={styles.icon} />
      <Text>There {isAre} no {name}</Text>
    </View>
  )
}

export default EmptyText;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // justifyContent: 'center',
    paddingVertical: 70,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  icon: {
    height: 50,
    width: 50,
    color: SECONDARY_COLORS.GREY,
    fill: SECONDARY_COLORS.GREY,
  },
});
