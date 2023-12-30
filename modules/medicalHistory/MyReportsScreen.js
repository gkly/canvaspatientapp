import React, {useState} from "react";
import SpinnerWrapper from "../../componentLibrary/SpinnerWrapper";
import {TextList} from "../../componentLibrary/TextList";
import ErrorText from "../../componentLibrary/ErrorText";
import EmptyText from "../../componentLibrary/EmptyText";
import ReportModal from "./modals/ReportModal";
import {useGetReports} from "../../hooks/resourceBased/useGetReports";
import LoadMoreButton from "../../componentLibrary/LoadMoreButton";

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

  const onPress = (report) => {
    setSelectedReport(report);
    setShowReportDetailsModal(true);
  }

  const reportItems = (Object.values(reports || {}) || []).map((report) => {
    return {
      title: report.name,
      description: `Type: ${report.type} | Date: ${report.date}`,
      isDisabled: false,
      onPress: () => onPress(report),
    }
  })

  return (
    <>
      {isLoading && <SpinnerWrapper />}
      {error && <ErrorText>Error: {error.message}</ErrorText>}
      {reportItems.length === 0 && <EmptyText name='labs/imaging reports' plural={true} />}
      <TextList items={reportItems} />
      {hasNextPage && (
        <LoadMoreButton isLoading={isFetchingNextPage} onPress={fetchNextPage} />
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
