import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  title: string,
  description?: string,
  showLine?: boolean,
  secondaryColor?: boolean,
}

const HeaderText = ({title, description, showLine=true, secondaryColor=false}: Props) => {
  const color = secondaryColor ? 'rgb(255, 255, 255)' : 'rgb(106,150,192)';
  let titleStyle = {...styles.title, color: color};
  if (!showLine) {
    titleStyle = {...titleStyle, marginBottom: 15}
  }

  return (
    <>
      <Text style={titleStyle}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      {showLine && <View style={{...styles.line, borderBottomColor: color}} />}
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  description: {
    marginTop: 5,
    fontSize: 14,
    fontStyle: 'italic',
  },
  line: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 15,
    marginBottom: 15,
  },
});

export default HeaderText;
