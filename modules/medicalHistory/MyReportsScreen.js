import React, {Fragment, useState} from "react";
import {StyleSheet, View} from "react-native";
import SpinnerWrapper from "../../componentLibrary/SpinnerWrapper";
import {TextList} from "../../componentLibrary/TextList";
import EmptyText from "../../componentLibrary/EmptyText";
import ReportModal from "./modals/ReportModal";
import {useGetReports} from "../../hooks/resourceBased/useGetReports";
import LoadMoreButton from "../../componentLibrary/LoadMoreButton";
import Tag from "../../componentLibrary/Tag";
import {COLORS, PATIENT_ID, PRIMARY_COLORS, REPORT_TYPES, RESOURCES} from "../../utils/constants";
import {useGetQuery} from "../../hooks/basic/useGetQuery";
import {loadInBrowser} from "../../utils/helpers";
import {useTranslation} from "react-i18next";

const MyReportsScreen = () => {
  const { t } = useTranslation();
  const [selectedReport, setSelectedReport] = useState();
  const [showReportDetailsModal, setShowReportDetailsModal] = useState(false);
  const {
    reports,
    allObservationsMapping,
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
      isDisabled: (report.url === undefined),
      tags: [<Fragment key={report.name}><Tag text={t(report.type)} color={color} circular={true} /></Fragment>],
      onPress: () => loadInBrowser(report.url),
    }
  })

  return (
    <View style={styles.container}>
      {isLoading && <SpinnerWrapper />}
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
