import {View} from 'react-native';
import {Button} from "@ui-kitten/components";
import {TextList} from "../../../componentLibrary/TextList";
import EmptyText from "../../../componentLibrary/EmptyText";
import {loadInBrowser} from "../../../utils/network_request_helpers";
import {PATIENT_ID, RESOURCES} from "../../../utils/constants";
import {useGetInfiniteQuery} from "../../../hooks/basic/useGetInfiniteQuery";
import Modal from "../../../componentLibrary/Modal";


const InvoicesModal = ({ onClose }) => {
  const queryParams = `subject=Patient/${PATIENT_ID}&category=invoicefull`;
  const { data, error, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage }  = useGetInfiniteQuery(RESOURCES.DOCUMENT_REFERENCE, false, queryParams);

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

  const buttonText = isFetchingNextPage ? "Loading..." : "Load More";

  return (
    <Modal
      isLoading={isLoading}
      errorMessage={error?.message}
      onClose={onClose}
      title='Invoices'
      scrollView={false} // since textlist is already supporting vertical scroll
    >
      <View>
        {invoiceItems.length === 0 && <EmptyText name='invoices' plural={true} />}
        <TextList items={invoiceItems} resource={RESOURCES.DOCUMENT_REFERENCE} />
        {hasNextPage && (
          <Button
            onPress={fetchNextPage}
            appearance='outline'
            disabled={isFetchingNextPage}
          >
            {buttonText}
          </Button>
        )}
      </View>
    </Modal>
  )
}

export default InvoicesModal;
