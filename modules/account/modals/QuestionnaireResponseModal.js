import {useTranslation} from "react-i18next";

import {TextList} from "../../../componentLibrary/TextList";
import {RESOURCES} from "../../../utils/constants";
import {useGetQuestionnaireResponse} from "../../../hooks/resourceBased/useGetQuestionnaireResponse";
import Modal from "../../../componentLibrary/Modal";

const QuestionnaireResponseModal = ({ onClose }) => {
  const { t } = useTranslation();
  const { questions, isLoading } = useGetQuestionnaireResponse();

  const questionItems = questions.map(q => ({
    title: q.question,
    description: q.answer,
    isDisabled: true,
  }));

  return (
    <Modal
      isLoading={isLoading}
      onClose={onClose}
      title={t('account-profile-questionnaire')}
      scrollView={false} // since textlist is already supporting vertical scroll
    >
      <TextList items={questionItems} resource={RESOURCES.QUESTIONNAIRE_RESPONSE} />
    </Modal>
  )
}

export default QuestionnaireResponseModal;
