import {TextList} from "../../../componentLibrary/TextList";
import {RESOURCES} from "../../../utils/constants";
import {useGetInfiniteQuery} from "../../../hooks/basic/useGetInfiniteQuery";
import EmptyText from "../../../componentLibrary/EmptyText";
import Modal from "../../../componentLibrary/Modal";
import LoadMoreButton from "../../../componentLibrary/LoadMoreButton";
import {useTranslation} from "react-i18next";


const MedicationsModal = ({ onClose }) => {
  const { t } = useTranslation();
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage }  = useGetInfiniteQuery(RESOURCES.MEDICATION);

  const medications = (data?.pages || [])
    .map((page, index) => {
      const medicationsRawData = page.entry || [];
      // TODO: low priority check which coding display should be used if this matters
      return medicationsRawData.map(({ resource: entry }) => entry["medicationCodeableConcept"]["coding"][0].display)
    })
    .reduce((acc, pageData) => acc.concat(pageData), []);

  const medicationItems = medications.map((medication) => {
    return { title: medication, isDisabled: true }
  })

  return (
    <Modal
      isLoading={isLoading}
      onClose={onClose}
      title={t('medhistory-overview-medications')}
      scrollView={false} // since textlist is already supporting vertical scroll
    >
      {medicationItems.length === 0 && <EmptyText name='medications' plural={true} />}
      <TextList items={medicationItems} resource={RESOURCES.MEDICATION} />
      {hasNextPage && (
        <LoadMoreButton isLoading={isFetchingNextPage} onPress={fetchNextPage} />
      )}
    </Modal>
  )
}

export default MedicationsModal;
