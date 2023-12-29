import {useQuery} from "@tanstack/react-query";
import {getRequest, getUrlForResource, getUrlForSearch} from "../../utils/network_request_helpers";

export const useGetQuery = (resource, isPatientSpecific=true, resourceId, additionalQueryParams) => {
  // Don't fire query if no resource provided. Can be used to prevent unnecessary API requests.
  if (resource === undefined) {
    return;
  }
  const url = (resourceId)
    ? getUrlForResource(resource, resourceId)
    : getUrlForSearch(resource, isPatientSpecific, additionalQueryParams);
  return useQuery({
    queryKey: [resource, additionalQueryParams],
    queryFn: () => getRequest(url),
    staleTime: 1 * 60 * 1000,
  });
};

