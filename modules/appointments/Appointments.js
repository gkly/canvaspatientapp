import { useState } from "react";
import NewAppointmentModal from "./NewAppointmentModal";
import AppointmentsCarousel from "./AppointmentsCarousel";
import {APPOINTMENT_TEMPORAL_FILTERS} from "../../utils/constants";

const Appointments = () => {
  const [isMakeAppointmentModalVisible, setIsMakeAppointmentModalVisible] = useState(false);

  return (
    <>
      <AppointmentsCarousel filter={APPOINTMENT_TEMPORAL_FILTERS.UPCOMING} />
      <AppointmentsCarousel filter={APPOINTMENT_TEMPORAL_FILTERS.PAST} />

      {isMakeAppointmentModalVisible &&
        <NewAppointmentModal onClose={() => setIsMakeAppointmentModalVisible(false)} />
      }
    </>
  )
}

export default Appointments;
