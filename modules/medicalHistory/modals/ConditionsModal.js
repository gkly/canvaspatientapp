import {TextList} from "../../../componentLibrary/TextList";
import {Button} from "@ui-kitten/components";
import {RESOURCES} from "../../../utils/constants";
import {useGetInfiniteQuery} from "../../../hooks/basic/useGetInfiniteQuery";
import EmptyText from "../../../componentLibrary/EmptyText";
import {formatConditionsData} from "../../../utils/formatters";
import Modal from "../../../componentLibrary/Modal";

const ConditionsModal = ({ onClose }) => {
  const { data, error, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage }  = useGetInfiniteQuery(RESOURCES.CONDITION);

  const conditions = formatConditionsData(data?.pages);
  const conditionItems = conditions.map((condition) => {
    return { title: condition, isDisabled: true }
  })

  const buttonText = isFetchingNextPage ? "Loading..." : "Load More";

  return (
    <Modal
      isLoading={isLoading}
      errorMessage={error?.message}
      onClose={onClose}
      title='Conditions'
      scrollView={false} // since textlist is already supporting vertical scroll
    >
      {conditionItems.length === 0 && <EmptyText name='conditions' plural={true} />}
      <TextList items={conditionItems} resource={RESOURCES.CONDITION} />
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

export default ConditionsModal;
