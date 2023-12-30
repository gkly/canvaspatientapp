import {Icon} from "@ui-kitten/components";
import {StyleSheet} from "react-native";
import Button from "./Button";


const LoadMoreButton = ({isLoading, onPress}) => {
  const buttonText = isLoading ? "Loading..." : "Load More";

  return (
    <Button
      text={buttonText}
      onPress={onPress}
      iconName='arrow-circle-down-outline'
      type='ghost'
      disabled={isLoading}
    />
  )
}

export default LoadMoreButton;

const styles = StyleSheet.create({
  button: {
    // color: 'rgb(106,150,192)',
    // fill: 'rgb(106,150,192)',
  },
  icon: {
    height: 15,
    width: 15,
  },
});
