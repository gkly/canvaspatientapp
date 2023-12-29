import React from "react";
import {getRequest, getUrl, getUrlForSearch} from "../../utils/network_request_helpers";
import {RESOURCES} from "../../utils/constants";
import {formatDate, formatTimeRange } from "../../utils/formatters";
import {useQuery} from "@tanstack/react-query";


export const useGetAvailableSlots = () => {
  // TODO get based on assigned care provider or open up to all providers
  const providerLocationId = 'Location.1-Staff.abb6bc714d35412dbbc4f5e80dcb30e6';

  let startDate = new Date();  // today
  // start with tomorrow and increment by a day to skip weekends
  startDate.setDate(startDate.getDate() + 1)
  while (startDate.getDay() in [6,7]) {
    startDate.setDate(startDate.getDate() + 1)
  }
  const startDateString = formatDate(startDate);

  let endDate = startDate
  endDate.setDate(endDate.getDate() + 14)
  const endDateString = formatDate(endDate);

  const duration = 120;
  const queryParams = `schedule=${providerLocationId}&start=${startDateString}&end=${endDateString}&duration=${duration}`;
  const url = getUrlForSearch(RESOURCES.SLOT, false, queryParams);

  const { data, isLoading, error } = useQuery({
    queryKey: [RESOURCES.SLOT],
    queryFn: () => getRequest(url),
  });
  let slots = {};

  if (!isLoading && !error && data) {
    const slotsRawData = data.entry || [];
    slots = slotsRawData
      .map(({ resource: entry }) => {
        const startServerFormat = entry.start;
        const startDateObj = new Date(startServerFormat);
        const endServerFormat = entry.end;
        const endDateObj = new Date(endServerFormat);

        return {
          dateForDisplay: startDateObj.toDateString(),
          timeRangeForDisplay: formatTimeRange(startDateObj, endDateObj),
          startServerFormat,
          endServerFormat,
        }
      })
      .reduce((acc, slot) => {
        if (slot.dateForDisplay in acc) {
          acc[slot.dateForDisplay].push(slot);
          return acc
        } else {
          return {
            ...acc,
            [slot.dateForDisplay]: [slot]
          }
        }
      }, {})
  }

  return { slots, error, isLoading }
}
