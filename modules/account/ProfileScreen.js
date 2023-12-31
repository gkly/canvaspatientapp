import {TextList} from "../../componentLibrary/TextList";
import { Icon } from '@ui-kitten/components';
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {StyleSheet} from "react-native";
import {RESOURCES} from "../../utils/constants";
import PersonalInformationModal from "./modals/PersonalInformationModal";
import AddressesModal from "./modals/AddressesModal";
import ConsentModal from "../onboarding/modals/ConsentModal";
import {useGetConsentStatus} from "../../hooks/resourceBased/useGetConsentStatus";
import {useGetQuestionnaireResponse} from "../../hooks/resourceBased/useGetQuestionnaireResponse";
import AuditCQuestionnaireModal from "../onboarding/modals/AuditCQuestionnaireModal";
import CareTeamModal from "./modals/CareTeamModal";


const ProfileScreen = () => {
  const { t } = useTranslation();
  const [showPersonalInformation, setShowPersonalInformation] = useState(false);
  const [showAddresses, setShowAddresses] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [showQuestionnaireModal, setShowQuestionnaireModal] = useState(false);
  const [showCareTeamModal, setShowCareTeamModal] = useState(false);
  const { status, isConsentCompleteLoading } = useGetConsentStatus();
  const { questions, isQuestionnaireCompleteLoading } = useGetQuestionnaireResponse();

  const contentItems = [
    {
      title: t('account-profile-personalinfo'),
      leftIcon: <Icon style={styles.icon} name='person-outline' />,
      isDisabled: false,
      onPress: () => setShowPersonalInformation(true),
    },
    {
      title: t('account-profile-addresses'),
      leftIcon: <Icon style={styles.icon} name='inbox-outline' />,
      isDisabled: false,
      onPress: () => setShowAddresses(true),
    },
    {
      title: t('account-profile-consent'),
      leftIcon: <Icon name='folder-outline' />,
      isDisabled: false,
      onPress: () => setShowConsentModal(true),
    },
    {
      title: t('account-profile-questionnaire'),
      leftIcon: <Icon name='question-mark' />,
      isDisabled: false,
      onPress: () => setShowQuestionnaireModal(true),
    },
    {
      title: t('account-profile-careteam'),
      leftIcon: <Icon name='heart' />,
      isDisabled: false,
      onPress: () => setShowCareTeamModal(true),
    },
  ]

  return (
    <>
      {/*TODO make list of resources or optional prop*/}
      <TextList items={contentItems} resource={RESOURCES.PATIENT} />

      {showPersonalInformation && <PersonalInformationModal onClose={() => setShowPersonalInformation(false)} /> }
      {showAddresses && <AddressesModal onClose={() => setShowAddresses(false)} /> }
      {(showConsentModal && !isConsentCompleteLoading) && (
        <ConsentModal
          onClose={() => setShowConsentModal(false)}
          status={status} />
      )}
      {(showQuestionnaireModal && !isQuestionnaireCompleteLoading) && (
        <AuditCQuestionnaireModal
          onClose={() => setShowQuestionnaireModal(false)}
          questionResponses={questions} />
      )}
      {showCareTeamModal && (
        <CareTeamModal onClose={() => setShowCareTeamModal(false)} />
      )}
    </>
  )
}
export default ProfileScreen;

const styles = StyleSheet.create({
  icon: {
    fill: 'rgba(0, 0, 255, 1)',
    outlineColor: 'rgba(0, 0, 255, 1)',
    color: 'rgba(0, 0, 255, 1)',

  },
})
