import {TextList} from "../../../componentLibrary/TextList";
import {Button} from "@ui-kitten/components";
import {RESOURCES} from "../../../utils/constants";
import {useGetInfiniteQuery} from "../../../hooks/basic/useGetInfiniteQuery";
import EmptyText from "../../../componentLibrary/EmptyText";
import {StyleSheet, View} from 'react-native';
import {formatGoalsData} from "../../../utils/formatters";
import Modal from "../../../componentLibrary/Modal";

const GoalsModal = ({ onClose }) => {
  const { data, error, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage }  = useGetInfiniteQuery(RESOURCES.GOAL);

  // const goals = (data?.pages || [])
  //   .map((page) => {
  //     const goalsRawData = page.entry || [];
  //     return goalsRawData.map(({ resource: entry }) => (
  //       {
  //         name: entry.description?.text,
  //         status: entry.achievementStatus?.coding[0]?.display,
  //         priority: entry.priority?.coding[0]?.display,
  //       }
  //     ))
  //   })
  //   .reduce((acc, pageData) => acc.concat(pageData), []);

  const goals = formatGoalsData(data?.pages);

  const goalItems = goals.map((goal) => {
    const statusDisplay = goal.status ? `Status: ${goal.status}` : '';
    const priorityDisplay = goal.priority ? `Priority: ${goal.priority}` : '';
    const divider = (statusDisplay && priorityDisplay) ? ' | ' : '';
    const description = `${statusDisplay}${divider}${priorityDisplay}`;
    return { title: goal.name, description, isDisabled: true }
  })

  const buttonText = isFetchingNextPage ? "Loading..." : "Load More";

  return (
    <Modal
      isLoading={isLoading}
      errorMessage={error?.message}
      onClose={onClose}
      title='Goals'
      scrollView={true} // since textlist is already supporting vertical scroll
    >
      <View style={styles.container}>
        {goalItems.length === 0 && <EmptyText name='goals' plural={true} />}
        <TextList items={goalItems} resource={RESOURCES.GOAL} />
        {hasNextPage && (
          <Button
            onPress={fetchNextPage}
            appearance='outline'
            disabled={isFetchingNextPage}
          >
            {buttonText}
          </Button>
        )}
      </View>
    </Modal>
  )
}

export default GoalsModal;

const styles = StyleSheet.create({
  // container: {
  //   // alignItems: 'center',
  //   // paddingVertical: '35%',
  //   // height: '100%',
  //   backgroundColor: 'rgba(106,150,192, 1)',
  //   borderRadius: 20,
  // },
});
