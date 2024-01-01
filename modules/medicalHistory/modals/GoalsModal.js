import {Fragment} from 'react';
import {TextList} from "../../../componentLibrary/TextList";
import {
  GOAL_STATUS_NEGATIVE_TREND,
  GOAL_STATUS_POSITIVE_TREND,
  RESOURCES,
  COLORS
} from "../../../utils/constants";
import {useGetInfiniteQuery} from "../../../hooks/basic/useGetInfiniteQuery";
import EmptyText from "../../../componentLibrary/EmptyText";
import {formatGoalsData} from "../../../utils/formatters";
import Modal from "../../../componentLibrary/Modal";
import Tag from "../../../componentLibrary/Tag";
import LoadMoreButton from "../../../componentLibrary/LoadMoreButton";
import {useTranslation} from "react-i18next";

const GoalsModal = ({ onClose }) => {
  const { t } = useTranslation();
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage }  = useGetInfiniteQuery(RESOURCES.GOAL);

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
      // Without the Fragment wrapping, React will show a key warning.
      Tags.push(
        <Fragment key={`${goal.name}-${goal.status}`}>
          <Tag text={goal.status} color={tagColor} circular={true} />
        </Fragment>
      );
    }
    if (goal.priority) {
      tagColor = COLORS.GREY;
      Tags.push(
        <Fragment key={`${goal.name}-${goal.priority}`}>
          <Tag text={goal.priority} color={tagColor} circular={true} />
        </Fragment>
      );
    }

    return { title: goal.name, isDisabled: true, description, tags: Tags }
  })


  return (
    <Modal
      isLoading={isLoading}
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

