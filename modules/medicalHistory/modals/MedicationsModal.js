import {TextList} from "../../../componentLibrary/TextList";
import {Button} from "@ui-kitten/components";
import {RESOURCES} from "../../../utils/constants";
import {useGetInfiniteQuery} from "../../../hooks/basic/useGetInfiniteQuery";
import EmptyText from "../../../componentLibrary/EmptyText";
import Modal from "../../../componentLibrary/Modal";

const MedicationsModal = ({ onClose }) => {
  const { data, error, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage }  = useGetInfiniteQuery(RESOURCES.MEDICATION);

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

  const buttonText = isFetchingNextPage ? "Loading..." : "Load More";

  return (
    <Modal
      isLoading={isLoading}
      errorMessage={error?.message}
      onClose={onClose}
      title='Medications'
      scrollView={false} // since textlist is already supporting vertical scroll
    >
      {medicationItems.length === 0 && <EmptyText name='medications' plural={true} />}
      <TextList items={medicationItems} resource={RESOURCES.MEDICATION} />
      {hasNextPage && (
        <Button
          onPress={fetchNextPage}
          appearance='outline'
          disabled={isFetchingNextPage}
        >
          {buttonText}
        </Button>
      )}
    </Modal>
  )
}

export default MedicationsModal;
