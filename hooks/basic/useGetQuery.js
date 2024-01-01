import {useQuery} from "@tanstack/react-query";
import {getRequest, getUrlForResource, getUrlForSearch} from "../../utils/network_request_helpers";
import Toast from 'react-native-toast-message';
import {useEffect} from "react";
import {ERROR_MESSAGES} from "../../utils/constants";

export const useGetQuery = (resource, isPatientSpecific=true, resourceId, additionalQueryParams) => {
  // Don't fire query if no resource provided.
  if (resource === undefined) {
    return;
  }
  const url = (resourceId)
    ? getUrlForResource(resource, resourceId)
    : getUrlForSearch(resource, isPatientSpecific, additionalQueryParams);
  const {data, isLoading, error} = useQuery({
    queryKey: [resource, additionalQueryParams],
    queryFn: () => getRequest(url),
    staleTime: 1 * 60 * 1000,
  });

  useEffect(() => {
    if (!isLoading && error?.message) {
      Toast.show({
        type: 'error',
        text1: ERROR_MESSAGES.FETCH,
      })
    }
  }, [isLoading, error?.message]);

  return {data, isLoading, error}
};

