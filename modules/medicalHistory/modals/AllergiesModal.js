import {useTranslation} from "react-i18next";

import {TextList} from "../../../componentLibrary/TextList";
import {RESOURCES} from "../../../utils/constants";
import {useGetInfiniteQuery} from "../../../hooks/basic/useGetInfiniteQuery";
import EmptyText from "../../../componentLibrary/EmptyText";
import {formatAllergiesData} from "../../../utils/formatters";
import Modal from "../../../componentLibrary/Modal";
import LoadMoreButton from "../../../componentLibrary/LoadMoreButton";

const AllergiesModal = ({ onClose }) => {
  const { t } = useTranslation();
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage }  = useGetInfiniteQuery(RESOURCES.ALLERGY);

  const allergies = formatAllergiesData(data?.pages);

  const allergyItems = allergies.map((allergy) => {
    return { title: allergy, isDisabled: true }
  })

  return (
    <Modal
      isLoading={isLoading}
      onClose={onClose}
      title={t('medhistory-overview-allergies')}
      scrollView={false} // since textlist is already supporting vertical scroll
    >
      {allergyItems.length === 0 && <EmptyText name='allergies' plural={true} />}
      <TextList items={allergyItems} resource={RESOURCES.ALLERGY} />
      {hasNextPage && (
        <LoadMoreButton isLoading={isFetchingNextPage} onPress={fetchNextPage} />
      )}
    </Modal>
  )
}

export default AllergiesModal;
