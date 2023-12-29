import React, {useCallback, useState} from 'react';
import {Card, Divider, Icon, List, ListItem, Text} from '@ui-kitten/components';
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

export const CardList = ({ items=[], resource }: TextListProps) => {
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
      <Card
        style={styles.item}
        status='basic'
      >
        <Text>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
          a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </Text>
      </Card>
    );
  }

  return (
    <List
      horizontal
      data={items}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default CardList;

const styles = StyleSheet.create({
  container: {
    maxHeight: 320,
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 4,
  },
});
