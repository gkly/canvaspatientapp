import React, {useState} from "react";
import SpinnerWrapper from "../../componentLibrary/SpinnerWrapper";
import {Text} from "react-native";
import {TextList} from "../../componentLibrary/TextList";
import {useGetInfiniteQuery} from "../../hooks/basic/useGetInfiniteQuery";
import {RESOURCES} from "../../utils/constants";
import {Button} from "@ui-kitten/components";
import ErrorText from "../../componentLibrary/ErrorText";
import EmptyText from "../../componentLibrary/EmptyText";
import ReportModal from "./modals/ReportModal";
import {useGetQuery} from "../../hooks/basic/useGetQuery";
import {useGetReports} from "../../hooks/resourceBased/useGetReports";

const MyReportsScreen = () => {
  const [selectedReport, setSelectedReport] = useState();
  const [showReportDetailsModal, setShowReportDetailsModal] = useState(false);
  const {
    reports,
    allObservationsMapping,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetReports();

  // console.log('reports (screen) =', reports);
  // console.log('allObservationsMapping (screen) =', allObservationsMapping);

  // const { data, error, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage }  = useGetInfiniteQuery(RESOURCES.REPORT);
  // const {data: parentObservation} = useGetQuery(RESOURCES.OBSERVATION, false, selectedReport?.parentObservationReferenceId);
  // console.log('parentObservation=', parentObservation);

  const onPress = (report) => {
    setSelectedReport(report);
    setShowReportDetailsModal(true);
  }

  // const reports = (data?.pages || [])
  //   .map((page) => {
  //     const reportsRawData = page.entry || [];
  //     return reportsRawData
  //       .map(({ resource: entry }) => {
  //         // TODO make util function
  //         const parentObservationReference = entry["result"]?.[0]?.["reference"];
  //         return {
  //           id: entry.id,
  //           name: entry?.code?.text,
  //           type: entry["category"]?.[0]?.["coding"]?.[0]?.["display"],
  //           // TODO format date
  //           date: entry["effectiveDateTime"],
  //           parentObservationReferenceId: parentObservationReference?.split('/')[1],
  //           observations: entry.code.coding,
  //         }
  //       })
  //       .reduce((acc, reportData) => {
  //         acc[reportData.id] = reportData;
  //         return acc
  //       }, {});
  //   })
  //   .reduce((acc, pageData) => ({...acc, ...pageData}), {});


  const reportItems = (Object.values(reports || {}) || []).map((report) => {
    return {
      title: report.name,
      description: `Type: ${report.type} | Date: ${report.date}`,
      isDisabled: false,
      onPress: () => onPress(report),
    }
  })

  const buttonText = isFetchingNextPage ? "Loading..." : "Load More";

  // TODO hook up observation report to click handler to make GET request for Observation

  // TODO make empty state nice
  return (
    <>
      {isLoading && <SpinnerWrapper />}
      {error && <ErrorText>Error: {error.message}</ErrorText>}
      {reportItems.length === 0 && <EmptyText name='labs/imaging reports' plural={true} />}
      <TextList items={reportItems} />
      {hasNextPage && (
        <Button
          onPress={fetchNextPage}
          appearance='outline'
          disabled={isFetchingNextPage}
        >
          {buttonText}
        </Button>
      )}
      {showReportDetailsModal && (
        <ReportModal
          report={selectedReport}
          observationIds={allObservationsMapping[selectedReport?.parentObservationReferenceId]}
          onClose={() => setShowReportDetailsModal(false)}
        />
      )}
    </>
  )
}

export default MyReportsScreen;
