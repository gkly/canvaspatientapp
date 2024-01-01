import {useGetPatient} from "../../hooks/resourceBased/useGetPatient";
import {Image, StyleSheet, Text, View} from "react-native";
import Button from "../../componentLibrary/Button";
import {useTranslation} from "react-i18next";
import LanguagePickerModal from "./LanguagePickerModal";
import {useState} from "react";
import {PRIMARY_COLORS} from "../../utils/constants";


const WelcomeCard = () => {
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
              disabled={true}
              onPress={() => console.log('This could be a new feature for caregivers to be able to view other patient accounts in one app!')}
            />
            {/*This is not necessary because language is auto-selected-based on Canvas records, but if a clinic wanted
            this to be a manual setting, this can be supported through the LanguagePickerModal commented out below.*/}
            <Button
              iconName='globe-outline'
              type='ghost'
              isSecondary={true}
              disabled={true}
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
    backgroundColor: PRIMARY_COLORS.BLUE,
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
    backgroundColor: PRIMARY_COLORS.BLUE,
    paddingBottom: 110,
  },
  name: {
    color: PRIMARY_COLORS.WHITE,
    fontSize: 35,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
