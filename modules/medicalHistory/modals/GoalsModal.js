import {TextList} from "../../../componentLibrary/TextList";
import {
  GOAL_PRIORITY_TYPES,
  GOAL_STATUS_NEGATIVE_TREND,
  GOAL_STATUS_POSITIVE_TREND,
  RESOURCES,
  COLORS
} from "../../../utils/constants";
import {useGetInfiniteQuery} from "../../../hooks/basic/useGetInfiniteQuery";
import EmptyText from "../../../componentLibrary/EmptyText";
import {StyleSheet, View} from 'react-native';
import {formatGoalsData} from "../../../utils/formatters";
import Modal from "../../../componentLibrary/Modal";
import Tag from "../../../componentLibrary/Tag";
import LoadMoreButton from "../../../componentLibrary/LoadMoreButton";
import {useTranslation} from "react-i18next";

const GoalsModal = ({ onClose }) => {
  const { t } = useTranslation();
  const { data, error, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage }  = useGetInfiniteQuery(RESOURCES.GOAL);

  const goals = formatGoalsData(data?.pages);

  const goalItems = goals.map((goal) => {
    const description = goal.dueDate ? `Due: ${goal.dueDate}` : '';
    const Tags = [];
    let tagColor;
    if (goal.status) {
      if (GOAL_STATUS_POSITIVE_TREND.includes(goal.status)) {
        tagColor = COLORS.GREEN;
      } else if (GOAL_STATUS_NEGATIVE_TREND.includes(goal.status)) {
        tagColor = COLORS.RED;
      } else {
        tagColor = COLORS.YELLOW;
      }
      Tags.push(<Tag text={goal.status} color={tagColor} circular={true} />);
    }
    if (goal.priority) {
      // if (goal.priority === GOAL_PRIORITY_TYPES.HIGH) {
      //   tagColor = COLORS.ORANGE;
      // } else if (goal.priority === GOAL_PRIORITY_TYPES.MEDIUM) {
      //   tagColor = COLORS.YELLOW;
      // } else {
      //   tagColor = COLORS.GREY;
      // }
      tagColor = COLORS.GREY;
      Tags.push(<Tag text={goal.priority} color={tagColor} circular={true} />);
    }

    return { title: goal.name, isDisabled: true, description, tags: Tags }
  })


  return (
    <Modal
      isLoading={isLoading}
      errorMessage={error?.message}
      onClose={onClose}
      title={t('medhistory-overview-goals')}
      scrollView={false} // since textlist is already supporting vertical scroll
    >
      <>
        {goalItems.length === 0 && <EmptyText name='goals' plural={true} />}
        <TextList items={goalItems} resource={RESOURCES.GOAL} showTags={true} />
        {hasNextPage && (
          <LoadMoreButton isLoading={isFetchingNextPage} onPress={fetchNextPage} />
        )}
      </>
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
  container: {
    // flex: 1,
    // padding: 10,
    width: 100,
  },
  stacked:{
    // flex: 1,
    // flexDirection: 'column',
    width: 100,
  }
});
