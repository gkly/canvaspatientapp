import {formatDate, formatTimeRange} from "../../utils/formatters";
import {useGetInfiniteQuery} from "../basic/useGetInfiniteQuery";
import {RESOURCES} from "../../utils/constants";

export const useGetAppointments = (date=new Date(), comparator='ge') => {
  const query = `date=${comparator}${formatDate(date)}`;
  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  }  = useGetInfiniteQuery(RESOURCES.APPOINTMENT, true, query);

  const appointments = (data?.pages || [])
    .map((page) => {
      const appointmentsRawData = page.entry || [];
      return appointmentsRawData
        .filter(({ resource: entry }) => entry.status !== 'cancelled')
        .map(({ resource: entry }) => {
          const startServerFormat = entry.start;
          const startDateObj = new Date(startServerFormat);
          const endServerFormat = entry.end;
          const endDateObj = new Date(endServerFormat);

          return {
            description: entry.description,
            type: entry.appointmentType.coding[0].display,
            url: entry.contained?.[0]?.address, // video call link (exists for telemedicine only)
            dateForDisplay: formatDate(startDateObj),
            timeRangeForDisplay: formatTimeRange(startDateObj, endDateObj),
          }
        })
    })
    .reduce((acc, pageData) => acc.concat(pageData), [])
    .sort((a,b) => a?.dateForDisplay < b?.dateForDisplay ? -1 : 1);;

  return {
    appointments,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  }
}
