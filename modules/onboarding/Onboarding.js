import { useState } from 'react';
import AuditCQuestionnaireModal from "./modals/AuditCQuestionnaireModal";
import ConsentModal from "./modals/ConsentModal";
import {useIsOnboardingComplete} from "../../hooks/composite/useIsOnboardingComplete";
import CoverageModal from "./modals/CoverageModal";
import CreateProfileModal from "./CreateProfileModal";
import Modal from "../../componentLibrary/Modal";
import Button from "../../componentLibrary/Button";


const Onboarding = ({onClose}) => {
  const {
    isProfileComplete,
    isConsentComplete,
    isQuestionnaireComplete,
    isCoverageComplete,
    isOnboardingCompleteLoading,
    onboardingCompleteError
  } = useIsOnboardingComplete();
  const [isCreateProfileModalVisible, setIsCreateProfileModalVisible] = useState(false);
  const [isCoverageModalVisible, setIsCoverageModalVisible] = useState(false);
  const [isAuditCQuestionnaireModalVisible, setIsAuditCQuestionnaireModalVisible] = useState(false);
  const [isConsentModalVisible, setIsConsentModalVisible] = useState(false);

  const checkmarkIconName = 'checkmark-circle-2-outline';

  return (
    <Modal
      isLoading={isOnboardingCompleteLoading}
      onClose={onClose}
      title='Onboarding'
      description='...a few more steps to get started!'
      scrollView={true}
    >
      {
        !isOnboardingCompleteLoading && !onboardingCompleteError && (
          <>
            <Button
              type='ghost'
              text='Basic Personal Information'
              iconName={isProfileComplete ? checkmarkIconName : null}
              onPress={() => setIsCreateProfileModalVisible(true)}
              disabled={isProfileComplete}
            />
            <Button
              type='ghost'
              text='Insurance Information'
              iconName={isCoverageComplete ? checkmarkIconName : null}
              onPress={() => setIsCoverageModalVisible(true)}
              disabled={isCoverageComplete}
            />
            <Button
              type='ghost'
              text='AUDIT-C Questionnaire'
              iconName={isQuestionnaireComplete ? checkmarkIconName : null}
              onPress={() => setIsAuditCQuestionnaireModalVisible(true)}
              disabled={isQuestionnaireComplete}
            />
            <Button
              type='ghost'
              text='Consent'
              iconName={isConsentComplete ? checkmarkIconName : null}
              onPress={() => setIsConsentModalVisible(true)}
              disabled={isConsentComplete}
            />
          </>
        )
      }

      {isCreateProfileModalVisible && (
        <CreateProfileModal
          onClose={() => setIsCreateProfileModalVisible(false)}
        />
      )}
      {isCoverageModalVisible && (
        <CoverageModal
          onClose={() => setIsCoverageModalVisible(false)}
        />
      )}
      {isAuditCQuestionnaireModalVisible && (
        <AuditCQuestionnaireModal
          onClose={() => setIsAuditCQuestionnaireModalVisible(false)}
          questionResponses={[]}
        />
      )}
      {isConsentModalVisible && (
        <ConsentModal
          onClose={() => setIsConsentModalVisible(false)}
          status={undefined}
        />
      )}
    </Modal>
  );
};

export default Onboarding;
