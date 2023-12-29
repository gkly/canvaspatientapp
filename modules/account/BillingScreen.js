import {TextList} from "../../componentLibrary/TextList";
import { Icon } from '@ui-kitten/components';
import {useState} from "react";
import CheckoutScreen from "./CheckoutScreen";
import InvoicesModal from "./modals/InvoicesModal";
import CoverageModal from "../onboarding/modals/CoverageModal";


const BillingScreen = () => {
  const [showInvoicesModal, setShowInvoicesModal] = useState(false);
  const [showCoverageModal, setShowCoverageModal] = useState(false);

  const contentItems = [
    {
      title: 'Invoices',
      leftIcon: <Icon name='file-text-outline' />,
      isDisabled: false,
      onPress: () => setShowInvoicesModal(true),
    },
    {
      title: 'Payment Method',
      leftIcon: <Icon name='credit-card-outline' />,
      isDisabled: false,
    },
    {
      title: 'Insurance Coverage',
      leftIcon: <Icon name='people-outline' />,
      isDisabled: false,
      onPress: () => setShowCoverageModal(true),
    },
  ]

  return (
    <>
      {/*<CheckoutScreen />*/}

      <TextList items={contentItems} />

      {showInvoicesModal && <InvoicesModal onClose={() => setShowInvoicesModal(false)} /> }
      {showCoverageModal && <CoverageModal onClose={() => setShowCoverageModal(false)} /> }
    </>
  )
}
export default BillingScreen;
