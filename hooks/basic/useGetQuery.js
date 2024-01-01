import {useQuery} from "@tanstack/react-query";
import {getRequest, getUrlForResource, getUrlForSearch} from "../../utils/network_request_helpers";
import Toast from "react-native-simple-toast";
import {useEffect} from "react";

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
      Toast.show('There was an error retrieving data.')
    }
  }, [isLoading, error?.message]);

  return {data, isLoading, error}
};

