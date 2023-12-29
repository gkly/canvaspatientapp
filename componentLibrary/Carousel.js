import {ScrollView, StyleSheet, View} from "react-native";


const Carousel = ({children}: Props) => {
  return (
    <ScrollView horizontal>
      {children.map((CarouselItem) => (
        <View style={styles.card}>
          {CarouselItem}
        </View>
      ))}
    </ScrollView>
  )
}

export default Carousel;

const styles = StyleSheet.create({
  container: {

  },
  card: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'rgb(171,168,168)',
    padding: 5,
    marginRight: 5,
  }
});