import {TextList} from "../../../componentLibrary/TextList";
import {RESOURCES} from "../../../utils/constants";
import {useGetInfiniteQuery} from "../../../hooks/basic/useGetInfiniteQuery";
import EmptyText from "../../../componentLibrary/EmptyText";
import {formatConditionsData} from "../../../utils/formatters";
import Modal from "../../../componentLibrary/Modal";
import LoadMoreButton from "../../../componentLibrary/LoadMoreButton";
import {useTranslation} from "react-i18next";

const ConditionsModal = ({ onClose }) => {
  const { t } = useTranslation();
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage }  = useGetInfiniteQuery(RESOURCES.CONDITION);

  const conditions = formatConditionsData(data?.pages);
  const conditionItems = conditions.map((condition) => {
    return { title: condition, isDisabled: true }
  })

  return (
    <Modal
      isLoading={isLoading}
      onClose={onClose}
      title={t('medhistory-overview-conditions')}
      scrollView={false} // since textlist is already supporting vertical scroll
    >
      {conditionItems.length === 0 && <EmptyText name='conditions' plural={true} />}
      <TextList items={conditionItems} resource={RESOURCES.CONDITION} />
      {hasNextPage && (
        <LoadMoreButton isLoading={isFetchingNextPage} onPress={fetchNextPage} />
      )}
    </Modal>
  )
}

export default ConditionsModal;
