import React from 'react';
import {StyleSheet, Text} from 'react-native';

type Props = {
  text: string,
  type?: string, // TODO limit to 3 options
  capitalize?: boolean
}

// todo
const CaptionText = ({text, type, capitalize=true}: Props) => {
  let color;
  if (type === 'tertiary') {
    color = 'rgb(121,102,102)';
  } else if (type === 'secondary') {
    color = 'rgb(255, 255, 255)';
  } else {
    color = 'rgb(106,150,192)';
  }

  const formattedText = capitalize ? text.toUpperCase() : text;

  return (
    <>
      <Text style={{...styles.text, color: color}}>{formattedText}</Text>
    </>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 5,
  }
});

export default CaptionText;
