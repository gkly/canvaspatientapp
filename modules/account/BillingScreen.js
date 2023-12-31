import {useState} from "react";
import { Icon } from '@ui-kitten/components';
import {useTranslation} from "react-i18next";

import CheckoutScreen from "./CheckoutScreen";
import {TextList} from "../../componentLibrary/TextList";
import InvoicesModal from "./modals/InvoicesModal";
import CoverageModal from "../onboarding/modals/CoverageModal";
import {STRIPE_PAYMENT_URL} from "../../utils/constants";
import {loadInBrowser} from "../../utils/network_request_helpers";


const BillingScreen = () => {
  const { t } = useTranslation();
  const [showInvoicesModal, setShowInvoicesModal] = useState(false);
  const [showCoverageModal, setShowCoverageModal] = useState(false);

  const contentItems = [
    {
      title: t('account-billing-invoices'),
      leftIcon: <Icon name='file-text-outline' />,
      isDisabled: false,
      onPress: () => setShowInvoicesModal(true),
    },
    {
      title:  t('account-billing-paymentmethod'),
      leftIcon: <Icon name='credit-card-outline' />,
      isDisabled: false,
      onPress: () => loadInBrowser(STRIPE_PAYMENT_URL),
    },
    {
      title:  t('account-billing-insurance'),
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
