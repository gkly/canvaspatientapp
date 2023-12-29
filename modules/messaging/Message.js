import { StyleSheet, Text, View } from "react-native";

type Props = {
  text: string,
  date: string,
  wasReceived: boolean,
}

const Message = ({ text, date, wasReceived }: Props) => {
  // TODO fix iOS not rounding message bubbles
  return (
    <View style={wasReceived ? styles.receivedContainer : styles.sentContainer}>
      <Text style={wasReceived ? styles.receivedBubble : styles.sentBubble}>
        {text}
      </Text>
      <Text style={wasReceived ? styles.receivedDate : styles.sentDate}>
        {date}
      </Text>
    </View>
  )
}

export default Message;

const styles = StyleSheet.create({
  receivedContainer: {
    transform: [{ scaleY: -1 }],
    // maxWidth: '75%',
    marginVertical: 5,
  },
  sentContainer: {
    transform: [{ scaleY: -1 }],
    // maxWidth: '75%',
    marginVertical: 5,
    alignSelf: 'flex-end',
  },
  receivedBubble: {
    maxWidth: '75%',
    borderRadius: 20,
    backgroundColor: 'rgb(133,147,161)',
    color: 'white',
    padding: 10,
  },
  receivedDate: {
    fontStyle: 'italic',
    color: 'grey',
    marginRight: 10,
  },
  sentBubble: {
    maxWidth: '75%',
    textAlign: 'right',
    borderRadius: 20,
    backgroundColor: 'rgb(106,150,192)',
    color: 'white',
    padding: 10,
  },
  sentDate: {
    alignSelf: 'flex-end',
    textAlign: 'right',
    fontStyle: 'italic',
    color: 'grey',
    marginLeft: 10,
  }
});
