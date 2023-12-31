import {StyleSheet, Text, View} from 'react-native';


const Tag = ({text, color, circular=false}) => {
  const shapeStyling = circular ? ({
    borderRadius: 100,
    width: 15,
    height: 15,
    backgroundColor: color,
  }) : ({
    borderRadius: 60,
  });

  return circular ? (
    <View style={styles.rowContainer}>
      <View style={styles.row}>
        <Text style={shapeStyling}></Text>
        <Text key={text} style={{...styles.text, color: color}}>{text}</Text>
      </View>
    </View>
  ) : (
    <Text key={text} style={{...styles.text, backgroundColor: color, ...shapeStyling}}>{text}</Text>
  )
}

export default Tag;

const styles = StyleSheet.create({
  text: {
    fontStyle: 'italic',
    color: 'rgb(255,255,255)',
    fontSize: 11,
    textAlign: 'center',
    padding: 5,
    // marginVertical: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
  },
  rowContainer: {
    flex: 1,
  },
});
