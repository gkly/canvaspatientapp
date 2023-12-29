import { useState } from 'react';
import { useGetAvailableSlots } from "../../hooks/resourceBased/useGetAvailableSlots";
import InputDropdown from "../../componentLibrary/InputDropdown";
import {Button, IndexPath} from "@ui-kitten/components";
import {StyleSheet} from "react-native";
import {getUrlForResource, postRequest} from "../../utils/network_request_helpers";
import {APPOINTMENT_TYPES, PATIENT_ID, PROVIDER_ID, RESOURCES, TELEMEDICINE_URL} from "../../utils/constants";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import InputText from "../../componentLibrary/InputText";
import {formatReferenceResource} from "../../utils/formatters";
import {isTextEmpty} from "../../utils/helpers";
import Modal from "../../componentLibrary/Modal";

const NewAppointmentModal = ({onClose}) => {
  const [reason, setReason] = useState();
  const {slots, error, isLoading} = useGetAvailableSlots();
  const slotDates = Object.keys(slots);
  const [slotDateSelectedIndex, setSlotDateSelectedIndex] = useState(new IndexPath(0));
  const slotDate = slotDates[slotDateSelectedIndex.row];
  const slotTimes = slotDate ? slots[slotDate].map(slot => slot.timeRangeForDisplay) : [];
  const [slotTimeSelectedIndex, setSlotTimeSelectedIndex] = useState(new IndexPath(0));
  const slotTime = slotTimes[slotTimeSelectedIndex.row];
  const appointmentTypes = [APPOINTMENT_TYPES.TELEMEDICINE, APPOINTMENT_TYPES.OFFICE];
  const [appointmentTypeSelectedIndex, setAppointmentTypeSelectedIndex] = useState(new IndexPath(0));
  const appointmentType = appointmentTypes[appointmentTypeSelectedIndex.row];

  const queryClient = useQueryClient();

  const bookAppointment = useMutation({
    mutationFn: ({reason, slot, appointmentType}) => {
      const basePayload = {
        resourceType: RESOURCES.APPOINTMENT,
        status: "proposed",
        reasonCode:[{"text":reason}],
        supportingInformation: [
          {
            reference:"Location/1",
            type:"Location"
          },
          {
            reference:"#appointment-meeting-endpoint-0",
            type:"Endpoint"
          }
        ],
        start: slot.startServerFormat,
        end: slot.endServerFormat,
        participant: [
          {
            actor: {
              reference: formatReferenceResource(RESOURCES.PATIENT, PATIENT_ID)
            },
            status: "accepted"
          },
          {
            actor:{
              reference: formatReferenceResource(RESOURCES.PROVIDER, PROVIDER_ID)
            },
            status: "accepted"
          }
        ]
      };

      let payload;
      if (appointmentType === APPOINTMENT_TYPES.TELEMEDICINE) {
        payload = {
          contained:[
            {
              resourceType:"Endpoint",
              id:"appointment-meeting-endpoint-0",
              status:"active",
              connectionType:{"code":"https"},
              payloadType:[{coding:[{code:"video-call"}]}],
              address: TELEMEDICINE_URL,
            }
          ],
          appointmentType:{
            coding:[{
              system:"http://snomed.info/sct",
              code:"448337001",
              display:APPOINTMENT_TYPES.TELEMEDICINE
            }]
          },
          ...basePayload
        }
      } else {
        payload = {
          appointmentType:{
            coding:[{
              system:"http://snomed.info/sct",
              code:"308335008",
              display:APPOINTMENT_TYPES.OFFICE
            }]
          },
          ...basePayload
        }
      }
      postRequest(getUrlForResource(RESOURCES.APPOINTMENT),payload)
    }
  })

  const onSubmit = () => {
    const slot = slots[slotDate].find(times => times.timeRangeForDisplay === slotTime);
    bookAppointment.mutate({reason, slot, appointmentType}, {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: [RESOURCES.APPOINTMENT]})
        onClose();
      }, // Canvas API does not return anything with successful POST
    })
  }

  return (
    <Modal
      onClose={onClose}
      isLoading={isLoading}
      errorMessage={error}
      title='Book an appointment'
      description='Find an available time with your provider and book an appointment. All fields are required.'
    >
      <InputText
        label='Reason for visit'
        value={reason}
        onChange={input => setReason(input)}
      />
      <InputDropdown
        label='Dates'
        selectedIndex={slotDateSelectedIndex}
        value={slotDate}
        onChange={index => setSlotDateSelectedIndex(index)}
        optionNames={slotDates}
      />
      <InputDropdown
        label='Times'
        selectedIndex={slotTimeSelectedIndex}
        value={slotTime}
        onChange={index => setSlotTimeSelectedIndex(index)}
        optionNames={slotTimes}
      />
      <InputDropdown
        label='Type'
        selectedIndex={appointmentTypeSelectedIndex}
        value={appointmentType}
        onChange={index => setAppointmentTypeSelectedIndex(index)}
        optionNames={appointmentTypes}
      />
      <Button
        style={styles.submitButton}
        onPress={onSubmit}
        disabled={bookAppointment.isPending || isTextEmpty(reason)}>
        Book Appointment
      </Button>
    </Modal>
  )
}

export default NewAppointmentModal;

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 10,
    padding: 50, // Increased button size
  },
});