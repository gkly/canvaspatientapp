import {Icon, IndexPath} from "@ui-kitten/components";
import {useState} from "react";
import {useGetQuery} from "../../../hooks/basic/useGetQuery";
import {RESOURCES} from "../../../utils/constants";
import InputText from "../../../componentLibrary/InputText";
import {TextList} from "../../../componentLibrary/TextList";
import {StyleSheet, Text} from "react-native";
import LabelWrapper from "../../../componentLibrary/LabelWrapper";

type Props = {
  payerName: string,
  setPayer: () => void,
  resetPayer: () => void,
}

const PayerNameSearch = ({setPayer, resetPayer, payerName}: Props) => {
  const [searchString, setSearchString] = useState();
  const searchQuery = `name=${searchString}&active=true`
  const { data, error, isLoading }  = useGetQuery(RESOURCES.ORGANIZATION, false, undefined, searchQuery);

  const organizations = (data?.entry || []).map(({ resource: entry }) => ({ name: entry.name, id: entry.id }));

  const organizationItems = organizations.map((org) => {
    return { title: org.name, isDisabled: false, onPress: () => setPayer(org)}
  })

  return (
    // <>
    //   {payerName && (
    //     <LabelWrapper label='Health insurance carrier' >
    //       <Text>{payerName}</Text>
    //       <Icon name='close-outline' style={styles.icon} onPress={resetPayer()} />
    //     </LabelWrapper>
    //   )}
    //   {!payerName && (
    //     <>
    //       <InputText
    //         label='Health plan carrier'
    //         value={searchString}
    //         onChange={input => setSearchString(input)}
    //       />
    //       <TextList items={organizationItems} />
    //     </>
    //   )}
    // </>
    <>
      <InputText
        label='Health plan carrier'
        value={searchString}
        onChange={input => setSearchString(input)}
      />
      <TextList items={organizationItems} />
    </>
  )
}

export default PayerNameSearch;

const styles = StyleSheet.create({
  icon: {
    height: 15,
    width: 15,
  },
});
