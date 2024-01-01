import {useTranslation} from "react-i18next";

import {View} from 'react-native';
import {TextList} from "../../../componentLibrary/TextList";
import EmptyText from "../../../componentLibrary/EmptyText";
import {RESOURCES} from "../../../utils/constants";
import Modal from "../../../componentLibrary/Modal";
import {useGetCareTeam} from "../../../hooks/resourceBased/useGetCareTeam";


const CareTeamModal = ({ onClose }) => {
  const { t } = useTranslation();
  const { careTeam, isCareTeamLoading } = useGetCareTeam();

  const careTeamItems = careTeam.map((provider) => {
    return { title: provider.name, description: provider.role, isDisabled: true}
  })

  return (
    <Modal
      isLoading={isCareTeamLoading}
      onClose={onClose}
      title={t('account-profile-careteam')}
      scrollView={false} // since textlist is already supporting vertical scroll
    >
      <View>
        {careTeamItems.length === 0 && <EmptyText name='care team' plural={false} />}
        <TextList items={careTeamItems} resource={RESOURCES.CARE_TEAM} />
      </View>
    </Modal>
  )
}

export default CareTeamModal;
