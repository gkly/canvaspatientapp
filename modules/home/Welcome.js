import HeaderText from "../../componentLibrary/HeaderText";
import {useGetPatient} from "../../hooks/resourceBased/useGetPatient";
import {Image, StyleSheet, View} from "react-native";
import { Icon } from '@ui-kitten/components';

const Welcome = () => {
  const { name, addresses, demographics, photo, isPatientLoading, patientError } = useGetPatient();
  const nameToDisplay = name?.firstNamePreferred || name?.firstNameLegal;
  const welcomeMessage = nameToDisplay ? `Hello ${nameToDisplay}!` : 'Hello!';


  // TODO fix weird formatting that happens in modal input text
  return (
    <>
      <View style={styles.header}>
        {/*<Icon name='home-outline' style={styles.icon} />*/}
        <Image source={require('../../assets/canvaslogo.png')} style={styles.image} />
      </View>
      <View style={styles.personalized}>
        <View style={styles.row}>
          {/*<Image source={{uri: photo}} style={styles.profileImage}/>*/}
          <HeaderText title={welcomeMessage} showLine={false} secondaryColor={false} />
        </View>
      </View>
    </>

  )
}

export default Welcome;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(106,150,192, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    height: 200,
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
  },
  image: {
    width: 150,
    height: 30,
    marginVertical: 10,
  },
  icon: {
    height: 50,
    width: 50,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 100,
    margin: 10
  },
  // image: {
  //   width: 17,
  //   height: 35,
  //   marginRight: 15,
  // },
  personalized: {
    // flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
});
