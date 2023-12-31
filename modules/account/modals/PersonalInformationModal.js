import {useTranslation} from "react-i18next";

import {TextList} from "../../../componentLibrary/TextList";
import {RESOURCES} from "../../../utils/constants";
import {useGetPatient} from "../../../hooks/resourceBased/useGetPatient";
import Modal from "../../../componentLibrary/Modal";

const PersonalInformationModal = ({ onClose }) => {
  const { t } = useTranslation();
  const { name, demographics, language, isPatientLoading, patientError } = useGetPatient();

  const personalInformationItems = [
    {
      title: name.firstNameLegal,
      description: 'First name',
      isDisabled: true,
    },
    {
      title: name.firstNamePreferred || name.firstNameLegal,
      description: 'Preferred name',
      isDisabled: true,
    },
    {
      title: name.lastNameLegal,
      description: 'Last name',
      isDisabled: true,
    },
    {
      title: demographics.birthDate,
      description: 'Date of birth',
      isDisabled: true,
    },
    {
      title: demographics.gender,
      description: 'Gender',
      isDisabled: true,
    },
    {
      title: language.display,
      description: 'Preferred language',
      isDisabled: true,
    },
  ];

  return (
    <Modal
      isLoading={isPatientLoading}
      errorMessage={patientError?.message}
      onClose={onClose}
      title={t('account-profile-personalinfo')}
      scrollView={false} // since textlist is already supporting vertical scroll
    >
      <TextList items={personalInformationItems} resource={RESOURCES.PATIENT} />
    </Modal>
  )
}

export default PersonalInformationModal;
