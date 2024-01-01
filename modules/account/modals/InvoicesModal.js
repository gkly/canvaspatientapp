import {useTranslation} from "react-i18next";

import {View} from 'react-native';
import {TextList} from "../../../componentLibrary/TextList";
import EmptyText from "../../../componentLibrary/EmptyText";
import {loadInBrowser} from "../../../utils/helpers";
import {PATIENT_ID, RESOURCES} from "../../../utils/constants";
import {useGetInfiniteQuery} from "../../../hooks/basic/useGetInfiniteQuery";
import Modal from "../../../componentLibrary/Modal";
import LoadMoreButton from "../../../componentLibrary/LoadMoreButton";
import {formatReferenceResource} from "../../../utils/formatters";


const InvoicesModal = ({ onClose }) => {
  const { t } = useTranslation();
  // const queryParams = `subject=Patient/${PATIENT_ID}&category=invoicefull`;
  const queryParams = `subject=${formatReferenceResource(RESOURCES.PATIENT, PATIENT_ID)}&category=invoicefull`;
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage }  = useGetInfiniteQuery(RESOURCES.DOCUMENT_REFERENCE, false, queryParams);

  const invoices = (data?.pages || [])
    .map((page) => {
      const invoicesRawData = page.entry || [];
      return invoicesRawData.map(({ resource: entry }) => (
        {
          date: new Date(entry.date).toDateString(),
          url: entry.content[0].attachment.url,
        }
      ))
    })
    .reduce((acc, pageData) => acc.concat(pageData), []);

  const invoiceItems = invoices.map((invoice) => {
    return { title: invoice.date, isDisabled: false, onPress: () => loadInBrowser(invoice.url)}
  })

  return (
    <Modal
      isLoading={isLoading}
      onClose={onClose}
      title={t('account-billing-invoices')}
      scrollView={false} // since textlist is already supporting vertical scroll
    >
      <View>
        {invoiceItems.length === 0 && <EmptyText name='invoices' plural={true} />}
        <TextList items={invoiceItems} resource={RESOURCES.DOCUMENT_REFERENCE} />
        {hasNextPage && (
          <LoadMoreButton isLoading={isFetchingNextPage} onPress={fetchNextPage} />
        )}
      </View>
    </Modal>
  )
}

export default InvoicesModal;
