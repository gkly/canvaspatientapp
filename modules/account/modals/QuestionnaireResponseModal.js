import {TextList} from "../../../componentLibrary/TextList";
import {RESOURCES} from "../../../utils/constants";
import {useGetQuestionnaireResponse} from "../../../hooks/resourceBased/useGetQuestionnaireResponse";
import Modal from "../../../componentLibrary/Modal";

const QuestionnaireResponseModal = ({ onClose }) => {
  const { questions, isLoading, error } = useGetQuestionnaireResponse();
  const questionItems = questions.map(q => ({
    title: q.question,
    description: q.answer,
    isDisabled: true,
  }));

  return (
    <Modal
      isLoading={isLoading}
      errorMessage={error?.message}
      onClose={onClose}
      title='Questionnaire'
      scrollView={false} // since textlist is already supporting vertical scroll
    >
      <TextList items={questionItems} resource={RESOURCES.QUESTIONNAIRE_RESPONSE} />
    </Modal>
  )
}

export default QuestionnaireResponseModal;
