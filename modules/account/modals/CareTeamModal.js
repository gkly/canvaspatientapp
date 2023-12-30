import {View} from 'react-native';
import {TextList} from "../../../componentLibrary/TextList";
import EmptyText from "../../../componentLibrary/EmptyText";
import {RESOURCES} from "../../../utils/constants";
import Modal from "../../../componentLibrary/Modal";
import {useGetCareTeam} from "../../../hooks/resourceBased/useGetCareTeam";


const CareTeamModal = ({ onClose }) => {
  const { careTeam, isCareTeamLoading, careTeamError } = useGetCareTeam();

  const careTeamItems = careTeam.map((provider) => {
    return { title: provider.name, description: provider.role, isDisabled: true}
  })

  return (
    <Modal
      isLoading={isCareTeamLoading}
      errorMessage={careTeamError?.message}
      onClose={onClose}
      title='Care Team'
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
