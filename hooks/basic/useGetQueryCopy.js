import React, {useState, useEffect} from "react";
import axios from "axios";
import {RESOURCES, TOKEN} from "../../utils/constants";
import {getRequest, getUrlForResource, getUrlForSearch} from "../../utils/network_request_helpers";
import {useQuery} from "@tanstack/react-query";

export const useGetQuery = (resource, isPatientSpecific=true, additionalQueryParams) => {
  const url = (resource === RESOURCES.PATIENT && isPatientSpecific)
    ? getUrlForResource(resource, additionalQueryParams)
    : getUrlForSearch(resource, isPatientSpecific, additionalQueryParams);
  return useQuery({
    queryKey: [resource, additionalQueryParams],
    queryFn: () => getRequest(url),
    staleTime: 1 * 60 * 1000,
  });
};
