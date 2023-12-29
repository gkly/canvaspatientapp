import {useGetInfiniteQuery} from "../basic/useGetInfiniteQuery";
import {RESOURCES} from "../../utils/constants";
import {getRequestBatch, getUrlForResource} from "../../utils/network_request_helpers";
import {parseIdFromResourcePath} from "../../utils/helpers";
import {useEffect, useState} from "react";
import {formatDate} from "../../utils/formatters";

export const useGetReports = () => {
  const { data, error, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage }  = useGetInfiniteQuery(RESOURCES.REPORT);
  const [allObservationsMapping, setAllObservationsMapping] = useState({});

  const reports = (data?.pages || [])
    .map((page) => {
      const reportsRawData = page.entry || [];
      return reportsRawData
        .map(({ resource: entry }) => {
          const parentObservationReference = entry["result"]?.[0]?.["reference"];
          return {
            id: entry.id,
            name: entry?.code?.text,
            type: entry["category"]?.[0]?.["coding"]?.[0]?.["display"],
            // TODO format date
            date: formatDate(new Date(entry["effectiveDateTime"])),
            parentObservationReferenceId: parseIdFromResourcePath(parentObservationReference),
            observationsCoding: entry.code.coding,
          }
        })
        .reduce((acc, reportData) => {
          acc[reportData.id] = reportData;
          return acc
        }, {});
    })
    .reduce((acc, pageData) => ({...acc, ...pageData}), {});

  useEffect(() => {
    const getObservations = async () => {
      const allRequestUrls = (Object.values(reports || {}) || [])
        .filter(report => report.parentObservationReferenceId !== undefined)
        .map(report => getUrlForResource(RESOURCES.OBSERVATION, report.parentObservationReferenceId));
      const allParentObservations = await getRequestBatch(allRequestUrls);

      const allObservationsMapping = allParentObservations.reduce((acc, parentObservation) => {
        acc[parentObservation.id] = parentObservation.hasMember.map(obs => parseIdFromResourcePath(obs.reference));
        return acc;
      }, {})
      setAllObservationsMapping(allObservationsMapping);
    }

    getObservations();
  }, [Object.keys(reports).length]);

  return {
    reports,
    allObservationsMapping,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  }
}
