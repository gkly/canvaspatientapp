import AppointmentsCarousel from "./AppointmentsCarousel";
import {APPOINTMENT_TEMPORAL_FILTERS} from "../../utils/constants";

const Appointments = () => {
  return (
    <>
      <AppointmentsCarousel filter={APPOINTMENT_TEMPORAL_FILTERS.UPCOMING} />
      <AppointmentsCarousel filter={APPOINTMENT_TEMPORAL_FILTERS.PAST} />
    </>
  )
}

export default Appointments;
