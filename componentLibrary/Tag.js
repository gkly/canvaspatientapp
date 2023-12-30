import {StyleSheet, Text} from 'react-native';


const Tag = ({text, color}) => {
  return (
    <Text key={text} style={{...styles.text, backgroundColor: color}}>{text}</Text>
  )
}

export default Tag;

const styles = StyleSheet.create({
  text: {
    color: 'rgb(255,255,255)',
    fontSize: 11,
    textAlign: 'center',
    padding: 5,
    marginVertical: 2,
    borderRadius: 60,
  }
});
