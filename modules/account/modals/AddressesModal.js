import {useTranslation} from "react-i18next";

import {TextList} from "../../../componentLibrary/TextList";
import {RESOURCES, SECONDARY_COLORS} from "../../../utils/constants";
import {useGetPatient} from "../../../hooks/resourceBased/useGetPatient";
import {ScrollView, StyleSheet, View} from "react-native";
import Modal from "../../../componentLibrary/Modal";

const AddressesModal = ({ onClose }) => {
  const { t } = useTranslation();
  const { addresses, isPatientLoading } = useGetPatient();

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
    return (
      <View style={styles.card} key={items.map(i=>i.title).toString()}>
        <TextList items={items} resource={RESOURCES.PATIENT} />
      </View>
    );
  });

  return (
    <Modal
      isLoading={isPatientLoading}
      onClose={onClose}
      title={t('account-profile-addresses')}
      scrollView={false} // since textlist is already supporting vertical scroll
    >
      <ScrollView horizontal>
        {renderAddressCards()}
      </ScrollView>
    </Modal>
  )
}

export default AddressesModal;

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: SECONDARY_COLORS.GREY,
    padding: 5,
    marginRight: 5,
  }
});
