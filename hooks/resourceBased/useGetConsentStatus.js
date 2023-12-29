import {CONSENT_CODE, RESOURCES} from "../../utils/constants";
import {useGetQuery} from "../basic/useGetQuery";

export const useGetConsentStatus = () => {
  const {data, isLoading, error} = useGetQuery(RESOURCES.CONSENT, true);

  // Only include consent with code P
  const relevantConsentStatus = (data?.entry || [])
    .filter(({resource}) => {
      return resource.category[0].coding[0].code === CONSENT_CODE;
    })
    .map(({resource}) => resource.status)

  let status;
  if (!isLoading && !error && data) {
    status = relevantConsentStatus.length > 0 ? relevantConsentStatus[0] : undefined;
  }

  return { status, isConsentCompleteLoading: isLoading, consentCompleteError: error };
}
