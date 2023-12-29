import {TextList} from "../../../componentLibrary/TextList";
import {Button} from "@ui-kitten/components";
import {RESOURCES} from "../../../utils/constants";
import {useGetInfiniteQuery} from "../../../hooks/basic/useGetInfiniteQuery";
import EmptyText from "../../../componentLibrary/EmptyText";
import {formatAllergiesData} from "../../../utils/formatters";
import Modal from "../../../componentLibrary/Modal";

const AllergiesModal = ({ onClose }) => {
  const { data, error, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage }  = useGetInfiniteQuery(RESOURCES.ALLERGY);

  // const allergies = (data?.pages || [])
  //   .map((page, index) => {
  //     const allergiesRawData = page.entry || [];
  //     // TODO: low priority check which coding display should be used if this matters
  //     return allergiesRawData.map(({ resource: entry }) => entry["code"].text)
  //   })
  //   .reduce((acc, pageData) => acc.concat(pageData), []);

  const allergies = formatAllergiesData(data?.pages);

  const allergyItems = allergies.map((allergy) => {
    return { title: allergy, isDisabled: true }
  })

  const buttonText = isFetchingNextPage ? "Loading..." : "Load More";

  return (
    <Modal
      isLoading={isLoading}
      errorMessage={error?.message}
      onClose={onClose}
      title='Allergies'
      scrollView={false} // since textlist is already supporting vertical scroll
    >
      {allergyItems.length === 0 && <EmptyText name='allergies' plural={true} />}
      <TextList items={allergyItems} resource={RESOURCES.ALLERGY} />
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

export default AllergiesModal;
