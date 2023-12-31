import {useGetPatient} from "../../hooks/resourceBased/useGetPatient";
import {Image, StyleSheet, Text, View} from "react-native";
import Button from "../../componentLibrary/Button";
import {useTranslation} from "react-i18next";
import LanguagePickerModal from "./LanguagePickerModal";
import {useState} from "react";


const WelcomeCard = () => {
  // TODO support caregiver accounts
  const [showPatientPickerModal, setShowPatientPickerModal] = useState(false);
  const [showLanguagePickerModal, setShowLanguagePickerModal] = useState(false);
  const { name } = useGetPatient();
  const { t } = useTranslation();

  const nameToDisplay = name?.firstNamePreferred || name?.firstNameLegal;
  const greeting = t('home-greeting');
  const welcomeMessage = nameToDisplay ? `${greeting} ${nameToDisplay}!` : `${greeting}!`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <Image source={require('../../assets/canvaslogo.png')} style={styles.image} />
          <View style={styles.row}>
            <Button
              iconName='people-outline'
              type='ghost'
              isSecondary={true}
              onPress={() => setShowLanguagePickerModal(true)}
            />
            <Button
              iconName='globe-outline'
              type='ghost'
              isSecondary={true}
              onPress={() => setShowLanguagePickerModal(true)}
            />
          </View>

        </View>
      </View>
      {showLanguagePickerModal && <LanguagePickerModal onClose={() => setShowLanguagePickerModal(false)} />}
      <View style={styles.personalized}>
        <Text style={styles.name}>{welcomeMessage}</Text>
      </View>
    </View>
  )
}

export default WelcomeCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'rgb(106,150,192)',
    marginBottom: 50,
  },
  header: {
    paddingTop: 50,
  },
  image: {
    marginLeft: 10,
    width: 110,
    height: 22,
  },
  personalized: {
    paddingLeft: 10,
    backgroundColor: 'rgb(106,150,192)',
    paddingBottom: 100,
  },
  name: {
    color: 'rgb(255,255,255)',
    fontSize: 35,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
