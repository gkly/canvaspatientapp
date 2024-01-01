import {useGetQuestionnaireResponse} from "../resourceBased/useGetQuestionnaireResponse";
import {useGetConsentStatus} from "../resourceBased/useGetConsentStatus";
import {CONSENT_STATUS_TYPES, RESOURCES} from "../../utils/constants";
import {useGetCoverage} from "../resourceBased/useGetCoverage";

export const useIsOnboardingComplete = () => {
  const { status, isConsentCompleteLoading, consentCompleteError } = useGetConsentStatus();
  const { questions, isQuestionnaireCompleteLoading, questionnaireCompleteError } = useGetQuestionnaireResponse();
  const { insurances, isCoverageLoading, coverageError } = useGetCoverage();
  const isCoverageComplete = insurances.length > 0;

  const isConsentComplete = (status === CONSENT_STATUS_TYPES.ACTIVE) || (status === CONSENT_STATUS_TYPES.REJECTED);
  const isQuestionnaireComplete = questions.length > 0;

  return {
    isOnboardingComplete: isQuestionnaireComplete && isConsentComplete && isCoverageComplete,
    isConsentComplete,
    isQuestionnaireComplete,
    isCoverageComplete,
    isOnboardingCompleteLoading: isQuestionnaireCompleteLoading || isConsentCompleteLoading || isCoverageLoading,
    onboardingCompleteError: questionnaireCompleteError || consentCompleteError || coverageError }
}
