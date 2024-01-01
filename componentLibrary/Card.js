import {Pressable, StyleSheet, Text, View} from "react-native";
import {loadInBrowser} from "../utils/helpers";
import {Icon} from "@ui-kitten/components";
import CaptionText from "./CaptionText";

const Card = ({title, iconName, onPress}) => {
  return (
     <Pressable
        style={{...styles.cardContainer}}
        onPress={onPress}
      >
        <View style={styles.card}>
          <View style={{...styles.leftIconContainer}} >
            <Icon
              name={iconName}
              fill='rgb(255, 255, 255)'
              style={styles.icon}
            />
          </View>
          <View style={styles.cardContent}>
            <CaptionText text={title} type='secondary' />
          </View>
        </View>

      </Pressable>
  );
}

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    // borderWidth: 2,
    // minWidth: 250,
    width: 150,
    height: 120,
    marginHorizontal: 5,
    flex: 1,
    // borderRadius: 20,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    // flexDirection: 'row',
    flexDirection: 'column',
    backgroundColor: 'rgb(177,190,188)',
    borderRadius: 20,
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    // backgroundColor: 'rgb(78,126,119)'
  },
  type: {
    fontStyle: 'italic',
    marginVertical: 5,
  },
  leftIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderTopLeftRadius: 15,
    // borderBottomLeftRadius: 15,
    borderRadius: 100,
    backgroundColor: 'rgb(104,124,121)',
    height: 75,
    width: 75,
  },
  icon: {
    width: 50,
    height: 50,
  },
  rightIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // width: 50,
  },
});