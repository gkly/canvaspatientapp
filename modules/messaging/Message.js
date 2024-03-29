import { StyleSheet, Text, View } from "react-native";
import {PRIMARY_COLORS} from "../../utils/constants";

type Props = {
  text: string,
  datetime: string,
  wasReceived: boolean,
}

const Message = ({ text, datetime, wasReceived }: Props) => {
  return (
    <View style={wasReceived ? styles.receivedContainer : styles.sentContainer}>
      <Text style={wasReceived ? styles.receivedBubble : styles.sentBubble}>
        {text}
      </Text>
      <Text style={wasReceived ? styles.receivedDate : styles.sentDate}>
        {datetime}
      </Text>
    </View>
  )
}

export default Message;

// TODO low simplify styling
const styles = StyleSheet.create({
  receivedContainer: {
    transform: [{ scaleY: -1 }],
    marginVertical: 5,
  },
  sentContainer: {
    transform: [{ scaleY: -1 }],
    marginVertical: 5,
    alignSelf: 'flex-end',
  },
  receivedBubble: {
    maxWidth: '75%',
    borderRadius: 20,
    overflow: 'hidden',
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
    overflow: 'hidden',
    backgroundColor: PRIMARY_COLORS.BLUE,
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
