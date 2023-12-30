import React from "react";
import {TextList} from "../../../componentLibrary/TextList";
import {useGetInfiniteQuery} from "../../../hooks/basic/useGetInfiniteQuery";
import {RESOURCES} from "../../../utils/constants";
import EmptyText from "../../../componentLibrary/EmptyText";
import Modal from "../../../componentLibrary/Modal";
import LoadMoreButton from "../../../componentLibrary/LoadMoreButton";
import {useTranslation} from "react-i18next";


const ImmunizationsModal = ({ onClose }) => {
  const { t } = useTranslation();
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

  return (
    <Modal
      isLoading={isLoading}
      errorMessage={error?.message}
      onClose={onClose}
      title={t('medhistory-overview-immunizations')}
      scrollView={false} // since textlist is already supporting vertical scroll
    >
      {immunizationItems.length === 0 && <EmptyText name='immunization records' plural={true} />}
      <TextList items={immunizationItems} resource={RESOURCES.IMMUNIZATION} />
      {hasNextPage && (
        <LoadMoreButton isLoading={isFetchingNextPage} onPress={fetchNextPage} />
      )}
    </Modal>
  )
}

export default ImmunizationsModal;
