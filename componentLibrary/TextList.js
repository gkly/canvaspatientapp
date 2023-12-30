import React, {useCallback, useState} from 'react';
import { Divider, Icon, List, ListItem, Text } from '@ui-kitten/components';
import {RefreshControl, StyleSheet, View} from "react-native";
import {useQueryClient} from "@tanstack/react-query";
import Tag from "./Tag";

export type TextListItem = {
  title: string;
  description: string;
  isDisabled: boolean;
  onPress?: () => void;
  leftIcon?: Icon;
}

export type TextListProps = {
  items: TextListItem[],
  resource: string; // TODO: update with RESOURCE type
}

export const TextList = ({ items=[], resource, showTags=false }: TextListProps) => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    queryClient
      .invalidateQueries({queryKey: [resource]})
      .then(setRefreshing(false))
  }, []);

  // TODO consider supporting badges
  const renderItem = ({ item }) => {
    const rightArrowIcon = item.isDisabled ? null : <Icon name='arrow-ios-forward' />;
    return (
      <View style={styles.rowContainer}>
        <View style={styles.row}>
          {showTags && (
            <View style={styles.tagContainer}>
              <View style={styles.stacked}>
                {item.tags}
                {/*{<Tag text={'In Progress'} />}*/}
                {/*{<Tag text={'High Priority'} />}*/}
              </View>
            </View>
          )}
          <View style={styles.listItemContainer}>
            <ListItem
              title={item.title}
              description={item.description}
              accessoryLeft={item.leftIcon}
              accessoryRight={rightArrowIcon}
              onPress={item.onPress}
              disabled={item.isDisabled}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <List
      style={styles.container}
      data={items}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default TextList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  tagContainer: {
    flex: 1,
    // padding: 10,
    // width: 100,
  },
  stacked:{
    // flex: 1,
    // flexDirection: 'column',
    // width: 100,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flex: 1,
  },
  listItemContainer: {
    flex: 2,
  }
});
