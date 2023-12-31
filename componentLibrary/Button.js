import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Icon} from "@ui-kitten/components";
import {PRIMARY_COLORS, SECONDARY_COLORS, TERTIARY_COLOR} from "../utils/constants";

type Props = {
  key?: string,
  text?: string,
  type?: string,
  iconName?: string,
  disabled?: boolean,
  isSecondary?: boolean,
  isMini?: boolean,
  onPress: () => void
};

const Button = ({key, text, onPress, type='filled', iconName, disabled, isMini=false, isSecondary=false}: Props) => {
  let color = isSecondary ? SECONDARY_COLORS.NAVY : PRIMARY_COLORS.BLUE;
  color = disabled ? SECONDARY_COLORS.GREY : color;
  const backgroundColorStyling = (type === 'filled') ? ({backgroundColor: color}) : {};
  const textColor = (type === 'ghost' || type === 'outline') ? color : PRIMARY_COLORS.WHITE;
  const textStyling = isMini ? ({
    fontSize: 11,
    paddingVertical: 5,
    paddingHorizontal: 10,
  }) : ({
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 10,
  });
  const iconSize = isMini ? 15 : 20;
  const marginVertical = isMini ? 5 : 10;
  const borderStyling = (type === 'outline') ? ({
    borderWidth: isMini ? 1 : 2,
    borderColor: color,
  }) : {};

  return (
    <Pressable key={key} onPress={onPress} style={{...styles.container, marginVertical, ...borderStyling, ...backgroundColorStyling}} disabled={disabled}>
      <View style={styles.content}>
        {text && <Text style={{...styles.text, color: textColor, ...textStyling}}>{text}</Text>}
        {iconName && <Icon name={iconName} style={{height: iconSize, width: iconSize}} fill={textColor} />}
      </View>
    </Pressable>
  )
}

export default Button;

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  text: {
    fontWeight: 'bold',
    // paddingVertical: 5,
    // paddingHorizontal: 10,
  },
  icon: {
    height: 15,
    width: 15,
  },
});
