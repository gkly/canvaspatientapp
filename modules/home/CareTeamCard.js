import {StyleSheet, Text, View} from "react-native";
import {PRIMARY_COLORS, SECONDARY_COLORS} from "../../utils/constants";
import Button from "../../componentLibrary/Button";
import NewAppointmentModal from "../appointments/NewAppointmentModal";
import {useState} from "react";
import {useGetCareTeam} from "../../hooks/resourceBased/useGetCareTeam";
import {useTranslation} from "react-i18next";

const CareTeamCard = () => {
  const { t } = useTranslation();
  const { careTeam } = useGetCareTeam();
  const [isMakeAppointmentModalVisible, setIsMakeAppointmentModalVisible] = useState(false);
  const leadProvider = careTeam[0];
  const display = `${leadProvider?.name} | ${t(leadProvider?.role)}`;

  // TODO (low) adjust size based on screensize
  return (
    <>
      <View style={styles.personalized}>
        <View style={styles.row}>
          <Text style={styles.caption}>{t('account-profile-careteam').toUpperCase()}</Text>
          {leadProvider && <Text style={styles.provider}>{display}</Text>}
        </View>
        <Button
          text={t('home-scheduleappointment')}
          isSecondary={true}
          onPress={() => setIsMakeAppointmentModalVisible(true)}
        />
      </View>

      {isMakeAppointmentModalVisible &&
        <NewAppointmentModal onClose={() => setIsMakeAppointmentModalVisible(false)} />
      }
    </>
  );
}

export default CareTeamCard;

const styles = StyleSheet.create({
  caption: {
    color: SECONDARY_COLORS.GREY,
    fontSize: 15,
    marginBottom: 5,
  },
  provider: {
    color: SECONDARY_COLORS.NAVY,
    fontWeight: 'bold',
  },
  personalized: {
    padding: 20,
    backgroundColor: PRIMARY_COLORS.WHITE,
    position: 'absolute',
    top:180,
    left:20,
    width: 320,
    height: 140,
    borderRadius: 20,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
