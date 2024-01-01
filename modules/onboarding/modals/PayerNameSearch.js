import {useState} from "react";
import {View} from "react-native";
import {useGetQuery} from "../../../hooks/basic/useGetQuery";
import {RESOURCES} from "../../../utils/constants";
import InputText from "../../../componentLibrary/InputText";
import {TextList} from "../../../componentLibrary/TextList";
import SpinnerWrapper from "../../../componentLibrary/SpinnerWrapper";


type Props = {
  setPayer: () => void,
}

const PayerNameSearch = ({setPayer}: Props) => {
  const [searchString, setSearchString] = useState();
  const searchQuery = `name=${searchString}&active=true`
  const { data, isLoading }  = useGetQuery(RESOURCES.ORGANIZATION, false, undefined, searchQuery);

  const organizations = (data?.entry || []).map(({ resource: entry }) => ({ name: entry.name, id: entry.id }));

  const organizationItems = organizations.map((org) => {
    return { title: org.name, isDisabled: false, onPress: () => setPayer(org)}
  })

  return (
    <View>
      <InputText
        label='Health plan carrier'
        value={searchString}
        onChange={input => setSearchString(input)}
      />
      <TextList items={organizationItems} />
      {isLoading && <SpinnerWrapper/>}
    </View>
  )
}

export default PayerNameSearch;
