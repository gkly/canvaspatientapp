import React from "react";
import {TextList} from "../../../componentLibrary/TextList";
import {Button} from "@ui-kitten/components";
import {useGetInfiniteQuery} from "../../../hooks/basic/useGetInfiniteQuery";
import {RESOURCES} from "../../../utils/constants";
import EmptyText from "../../../componentLibrary/EmptyText";
import Modal from "../../../componentLibrary/Modal";

const ImmunizationsModal = ({ onClose }) => {
  const { data, error, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage }  = useGetInfiniteQuery(RESOURCES.IMMUNIZATION);

  const immunizations = (data?.pages || [])
    .map((page) => {
      const immunizationsRawData = page.entry || [];
      return immunizationsRawData.map(({ resource: entry }) => (
        {
          name: entry["vaccineCode"]["coding"][0]["display"],
          date: entry["occurrenceDateTime"],
        }
      ))
    })
    .reduce((acc, pageData) => acc.concat(pageData), []);

  const immunizationItems = immunizations.map((immunization) => {
    return { title: immunization.name, description: immunization.date, isDisabled: true }
  })

  // TODO make DRY
  const buttonText = isFetchingNextPage ? "Loading..." : "Load More";

  return (
    <Modal
      isLoading={isLoading}
      errorMessage={error?.message}
      onClose={onClose}
      title='Immunizations'
      scrollView={false} // since textlist is already supporting vertical scroll
    >
      {immunizationItems.length === 0 && <EmptyText name='immunization records' plural={true} />}
      <TextList items={immunizationItems} resource={RESOURCES.IMMUNIZATION} />
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

export default ImmunizationsModal;
