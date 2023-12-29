import {Button, Icon, Text} from "@ui-kitten/components";
import {Pressable, FlatList, StyleSheet, View} from "react-native";
import React, {useState} from 'react';
import {TextList, TextListItem} from "./TextList";

type Props = {
  iconName: string,
  title: string,
  contentItems?: TextListItem[],
  onLoadMore?: () => void,
}

const SectionCard = ({iconName, title, contentItems=[], onLoadMore}: Props) => {
  const [showContent, setShowContent] = useState(false)
  const rightIcon = !!showContent ? <Icon name='arrow-ios-upward' /> : <Icon name='arrow-ios-downward' />

  const renderContent = contentItems.length == 0 ? <Text>None</Text> : (
    <>
      <TextList items={contentItems} />
      {onLoadMore && <Button onPress={onLoadMore} appearance='outline' >Load more</Button>}
    </>
  );

  return (
    <View style={styles.container}>
      {/*<Pressable style={styles.heading} onPress={() => setShowContent(!showContent)}>*/}
        {/*/!*<Icon name={iconName} />*!/*/}
        {/*<Text>{title}</Text>*/}
        {/*/!*{rightIcon}*!/*/}
        {/*<Icon name='arrow-ios-upward' />*/}
      {/*</Pressable>*/}

      <Button
        status='info'
        style={styles.button}
        accessoryLeft={<Icon name={iconName} />}
        accessoryRight={rightIcon}
        onPress={() => setShowContent(showContent => !showContent)}>
        <Text>{title}</Text>
      </Button>

      {!!showContent && renderContent}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    alignSelf: 'stretch',
    flex:1,
    justifyContent: 'space-between',
    border: true,
  },
  button: {
    justifyContent: 'space-between',
    marginVertical: 5,
  }
});

export default SectionCard;
