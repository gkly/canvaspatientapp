import {useInfiniteQuery} from "@tanstack/react-query";
import {getRequest, getUrlForSearch} from "../../utils/network_request_helpers";
import {BASE_URL, ERROR_MESSAGES} from "../../utils/constants";
import Toast from 'react-native-toast-message';
import {useEffect} from "react";

export const useGetInfiniteQuery = (resource, isPatientSpecific=true, additionalQueryParams) => {
  const { data, error, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
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

  useEffect(() => {
    if (!isLoading && error?.message) {
      Toast.show({
        type: 'error',
        text1: ERROR_MESSAGES.FETCH,
      })
    }
  }, [isLoading, error?.message]);

  return { data, error, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage };
}
