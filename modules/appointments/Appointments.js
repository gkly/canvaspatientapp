import { useState, useEffect } from "react";
import NewAppointmentModal from "./NewAppointmentModal";
import {StyleSheet} from "react-native";
import AppointmentsCarousel from "./AppointmentsCarousel";
import {APPOINTMENT_TEMPORAL_FILTERS} from "../../utils/constants";
import Card from "../../componentLibrary/Card";
import {useTranslation} from "react-i18next";

const Appointments = () => {
  const [isMakeAppointmentModalVisible, setIsMakeAppointmentModalVisible] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      {/*<Button*/}
      {/*  onPress={() => setIsMakeAppointmentModalVisible(true)}*/}
      {/*  style={styles.cta}*/}
      {/*>*/}
      {/*  Schedule an appointment*/}
      {/*</Button>*/}
      {/*<Card title={t('home-scheduleappointment')} iconName='calendar-outline' onPress={() => setIsMakeAppointmentModalVisible(true)} />*/}

      <AppointmentsCarousel filter={APPOINTMENT_TEMPORAL_FILTERS.UPCOMING} />
      <AppointmentsCarousel filter={APPOINTMENT_TEMPORAL_FILTERS.PAST} />

      {isMakeAppointmentModalVisible &&
        <NewAppointmentModal onClose={() => setIsMakeAppointmentModalVisible(false)} />
      }
    </>
  )
}

export default Appointments;

const styles = StyleSheet.create({
  cta: {
    marginVertical: 10,
  },
  upcoming: {
    // maxHeight: 250,
  }
});
