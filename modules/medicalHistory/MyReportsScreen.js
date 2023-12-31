import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import SpinnerWrapper from "../../componentLibrary/SpinnerWrapper";
import {TextList} from "../../componentLibrary/TextList";
import ErrorText from "../../componentLibrary/ErrorText";
import EmptyText from "../../componentLibrary/EmptyText";
import ReportModal from "./modals/ReportModal";
import {useGetReports} from "../../hooks/resourceBased/useGetReports";
import LoadMoreButton from "../../componentLibrary/LoadMoreButton";
import Tag from "../../componentLibrary/Tag";
import {COLORS, PRIMARY_COLORS, REPORT_TYPES, RESOURCES} from "../../utils/constants";

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
    const color = (report.type === REPORT_TYPES.LABORATORY) ? COLORS.GREEN : COLORS.ORANGE;
    return {
      title: report.name,
      description: report.date,
      isDisabled: false,
      tags: [<Tag text={report.type} color={color} circular={true} />],
      onPress: () => onPress(report),
    }
  })

  return (
    <View style={styles.container}>
      {isLoading && <SpinnerWrapper />}
      {error && <ErrorText>Error: {error.message}</ErrorText>}
      {reportItems.length === 0 && <EmptyText name='labs/imaging reports' plural={true} />}
      <TextList items={reportItems} showTags={true} resource={RESOURCES.DOCUMENT_REFERENCE} />
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
    </View>
  )
}

export default MyReportsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: PRIMARY_COLORS.WHITE,
    paddingLeft: 15,
    height: '100%',
  }
})
