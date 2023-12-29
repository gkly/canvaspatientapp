import {View} from 'react-native';
import {TextList} from "../../../componentLibrary/TextList";
import EmptyText from "../../../componentLibrary/EmptyText";
import {RESOURCES} from "../../../utils/constants";
import {useGetQuery} from "../../../hooks/basic/useGetQuery";
import Modal from "../../../componentLibrary/Modal";


const CareTeamModal = ({ onClose }) => {
  const { data, error, isLoading }  = useGetQuery(RESOURCES.CARE_TEAM, true);

  const careTeam = (data?.entry || [])
    .map(({ resource: entry }) => ({
      name: entry.participant[0].member.display,
      role: entry.participant[0].role[0].coding[0].display,
    }));

  const careTeamItems = careTeam.map((provider) => {
    return { title: provider.name, description: provider.role, isDisabled: true}
  })

  return (
    <Modal
      isLoading={isLoading}
      errorMessage={error?.message}
      onClose={onClose}
      title='CareTeam'
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
