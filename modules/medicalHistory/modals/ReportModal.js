import {useGetObservationValues} from "../../../hooks/resourceBased/useGetObservationValues";
import TextList from "../../../componentLibrary/TextList";
import {RESOURCES} from "../../../utils/constants";
import Modal from "../../../componentLibrary/Modal";

const ReportModal = ({ report, onClose, observationIds }) => {
  const { observationResultsMapping } = useGetObservationValues(report.observationsCoding, observationIds)

  const observationResultItems = Object.values(observationResultsMapping || {}).map((obs) => {
    return {
      title: obs.value,
      description: `${obs.criteria} (${obs.unit})`,
      isDisabled: true
    }
  })

  return (
    <Modal
      isLoading={false}
      onClose={onClose}
      title={report.name}
      scrollView={false} // since textlist is already supporting vertical scroll
    >
      <TextList items={observationResultItems} resource={RESOURCES.OBSERVATION} />
    </Modal>
  )
}

export default ReportModal;
