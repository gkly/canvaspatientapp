import {useGetInfiniteQuery} from "../basic/useGetInfiniteQuery";
import {
  IMAGING_DOCUMENT_REFERENCE_ID,
  LAB_DOCUMENT_REFERENCE_ID,
  PATIENT_ID,
  REPORT_TYPES,
  RESOURCES
} from "../../utils/constants";
import {getRequestBatch, getUrlForResource} from "../../utils/network_request_helpers";
import {parseIdFromResourcePath} from "../../utils/helpers";
import {useEffect, useState} from "react";
import {formatDate, formatReferenceResource} from "../../utils/formatters";
import {useGetQuery} from "../basic/useGetQuery";

export const useGetReports = () => {
  const { data, error, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage }  = useGetInfiniteQuery(RESOURCES.REPORT);
  const [allObservationsMapping, setAllObservationsMapping] = useState({});

  // Canvas API does not currently link DocumentReferences with Reports. Ideally, the Reports endpoint would return a
  // DocumentReference id that can be used to retrieve the PDF or the link in the Report response to minimize additional
  // API calls. The url here proof of concept.  Canvas API for direct ID referencing (/DocumentReference/{id}) does not
  // return the file url in the response.
  const imagingQueryParams = `subject=${formatReferenceResource(RESOURCES.PATIENT, PATIENT_ID)}&category=imagingreport`;
  const labQueryParams = `subject=${formatReferenceResource(RESOURCES.PATIENT, PATIENT_ID)}&category=labreport`;
  const { data: imagingData } = useGetQuery(RESOURCES.DOCUMENT_REFERENCE, false, undefined, imagingQueryParams);
  const { data: labData } = useGetQuery(RESOURCES.DOCUMENT_REFERENCE, false, undefined, labQueryParams);

  const image = (imagingData?.entry || []).find(i => i.resource?.id === IMAGING_DOCUMENT_REFERENCE_ID);
  const lab = (labData?.entry || []).find(i => i.resource?.id === LAB_DOCUMENT_REFERENCE_ID);

  const reports = (data?.pages || [])
    .map((page) => {
      const reportsRawData = page.entry || [];
      return reportsRawData
        .map(({ resource: entry }) => {
          const parentObservationReference = entry["result"]?.[0]?.["reference"];
          const type = entry["category"]?.[0]?.["coding"]?.[0]?.["display"];
          const url = (type === REPORT_TYPES.RADIOLOGY) ? image?.resource?.content[0].attachment.url : lab?.resource?.content[0].attachment.url;
          console.log('url=', url)
          return {
            id: entry.id,
            name: entry?.code?.text,
            type,
            date: formatDate(new Date(entry["effectiveDateTime"])),
            parentObservationReferenceId: parseIdFromResourcePath(parentObservationReference),
            observationsCoding: entry.code.coding,
            url,
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
