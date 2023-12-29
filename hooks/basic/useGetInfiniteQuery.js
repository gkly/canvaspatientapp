import {useInfiniteQuery} from "@tanstack/react-query";
import {getRequest, getUrlForSearch} from "../../utils/network_request_helpers";
import {BASE_URL} from "../../utils/constants";

export const useGetInfiniteQuery = (resource, isPatientSpecific=true, additionalQueryParams) => useInfiniteQuery({
  queryKey: [resource, additionalQueryParams],
  queryFn: (queryParams) => {
    const endpoint = queryParams?.pageParam;
    const url = endpoint ? (BASE_URL + endpoint) : getUrlForSearch(resource, isPatientSpecific, additionalQueryParams);
    return getRequest(url)
  },
  // cacheTime: 0.5 * 60 * 1000,
  staleTime: 1 * 60 * 1000,
  keepPreviousData: true,
  getNextPageParam: (lastPage, allPages) => {
    const nextLink = lastPage?.link?.find(l => l.relation === 'next')?.url;
    return nextLink;
  },
});

