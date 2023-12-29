import React, {useCallback, useState} from 'react';
import { Divider, Icon, List, ListItem } from '@ui-kitten/components';
import {RefreshControl, StyleSheet} from "react-native";
import {useQueryClient} from "@tanstack/react-query";

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

export const TextList = ({ items=[], resource }: TextListProps) => {
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
      <ListItem
        title={item.title}
        description={item.description}
        accessoryLeft={item.leftIcon}
        accessoryRight={rightArrowIcon}
        onPress={item.onPress}
        disabled={item.isDisabled}
      />
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
});
