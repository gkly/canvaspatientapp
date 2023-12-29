import { useState } from 'react';
import { Button, Icon } from '@ui-kitten/components';
import AuditCQuestionnaireModal from "./modals/AuditCQuestionnaireModal";
import ConsentModal from "./modals/ConsentModal";
import {useIsOnboardingComplete} from "../../hooks/composite/useIsOnboardingComplete";
import CoverageModal from "./modals/CoverageModal";
import CreateProfileModal from "./CreateProfileModal";
import Modal from "../../componentLibrary/Modal";


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

  const CheckmarkIcon = <Icon name='checkmark-circle-2-outline' />;

  return (
    <Modal
      isLoading={isOnboardingCompleteLoading}
      errorMessage={onboardingCompleteError}
      onClose={onClose}
      title='Onboarding'
      description='...a few more steps to get started!'
    >
      {
        !isOnboardingCompleteLoading && !onboardingCompleteError && (
          <>
            <Button
              appearance='ghost'
              accessoryRight={isProfileComplete ? CheckmarkIcon : null}
              onPress={() => setIsCreateProfileModalVisible(true)}
              disabled={isProfileComplete}
            >
              Basic Personal Information
            </Button>
            <Button
              appearance='ghost'
              accessoryRight={isCoverageComplete ? CheckmarkIcon : null}
              onPress={() => setIsCoverageModalVisible(true)}
              disabled={isCoverageComplete}
            >
              Insurance Information
            </Button>
            <Button
              appearance='ghost'
              accessoryRight={isQuestionnaireComplete ? CheckmarkIcon : null}
              onPress={() => setIsAuditCQuestionnaireModalVisible(true)}
              disabled={isQuestionnaireComplete}
            >
              AUDIT-C Questionnaire
            </Button>
            <Button
              appearance='ghost'
              accessoryRight={isConsentComplete ? CheckmarkIcon : null}
              onPress={() => setIsConsentModalVisible(true)}
              disabled={isConsentComplete}
            >
              Consent
            </Button>
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
