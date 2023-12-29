import {TextList} from "../../../componentLibrary/TextList";
import {RESOURCES} from "../../../utils/constants";
import {useGetPatient} from "../../../hooks/resourceBased/useGetPatient";
import {StyleSheet} from "react-native";
import Carousel from "../../../componentLibrary/Carousel";
import Modal from "../../../componentLibrary/Modal";

const AddressesModal = ({ onClose }) => {
  const { addresses, isPatientLoading, patientError } = useGetPatient();
  const renderAddressCards = () => addresses.map(a => {
    const items = [
      {
        title: a.use,
        description: 'Use',
        isDisabled: true,
      },
      {
        title: a.type,
        description: 'Type',
        isDisabled: true,
      },
      {
        title: a.line[0],
        description: 'Street address',
        isDisabled: true,
      },
      {
        title: `${a.city}, ${a.postalCode}`,
        description: 'State, zip code',
        isDisabled: true,
      },
      {
        title: a.country,
        description: 'Country',
        isDisabled: true,
      },
    ]
    return <TextList items={items} resource={RESOURCES.PATIENT} />;
  });

  return (
    <Modal
      isLoading={isPatientLoading}
      errorMessage={patientError?.message}
      onClose={onClose}
      title='Addresses'
      scrollView={false} // since textlist is already supporting vertical scroll
    >
      <Carousel>
        {renderAddressCards()}
      </Carousel>
    </Modal>
  )
}

export default AddressesModal;

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'rgb(171,168,168)',
    padding: 5,
    marginRight: 5,
  }
});
