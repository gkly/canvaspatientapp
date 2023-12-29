import {useGetQuestionnaireResponse} from "../resourceBased/useGetQuestionnaireResponse";
import {useGetConsentStatus} from "../resourceBased/useGetConsentStatus";
import {CONSENT_STATUS_TYPES, RESOURCES} from "../../utils/constants";
import {useGetQuery} from "../basic/useGetQuery";
import {useGetPatient} from "../resourceBased/useGetPatient";
import {useGetCoverage} from "../resourceBased/useGetCoverage";

export const useIsOnboardingComplete = () => {
  const { name, demographics, isPatientLoading, patientError } = useGetPatient();
  const isProfileComplete = (name !== undefined && demographics !== undefined);
  const { status, isConsentCompleteLoading, consentCompleteError } = useGetConsentStatus();
  const { questions, isQuestionnaireCompleteLoading, questionnaireCompleteError } = useGetQuestionnaireResponse();
  const { insurances, isCoverageLoading, coverageError } = useGetCoverage();
  const isCoverageComplete = insurances.length > 0;

  const isConsentComplete = (status === CONSENT_STATUS_TYPES.ACTIVE) || (status === CONSENT_STATUS_TYPES.REJECTED);
  const isQuestionnaireComplete = questions.length > 0;

  return {
    isOnboardingComplete: isProfileComplete && isQuestionnaireComplete && isConsentComplete && isCoverageComplete,
    isProfileComplete,
    isConsentComplete,
    isQuestionnaireComplete,
    isCoverageComplete,
    isOnboardingCompleteLoading: isPatientLoading || isQuestionnaireCompleteLoading || isConsentCompleteLoading || isCoverageLoading,
    onboardingCompleteError: patientError || questionnaireCompleteError || consentCompleteError || coverageError }
}
