import {useQuery} from "@tanstack/react-query";
import {PATIENT_ID, QUESTIONNAIRE_ID, RESOURCES} from "../../utils/constants";
import {getRequest, getUrlForResource, getUrlForSearch} from "../../utils/network_request_helpers";
import {useGetQuery} from "../basic/useGetQuery";

export const useGetQuestionnaireResponse = () => {
  const {data, isLoading, error} = useGetQuery(RESOURCES.QUESTIONNAIRE_RESPONSE, true, undefined,`questionnaire=${QUESTIONNAIRE_ID}`);

  let questions = [];  // TODO rename to questionResponses
  if (!isLoading && !error && data) {
    // questionnaire should only be completed once
    const questionnaireRawData = (data.entry || [])[0]?.resource;
    if (questionnaireRawData) {
      questions = questionnaireRawData.item.map(q => ({
        question: q.text,
        answer: q.answer[0].valueCoding.display
      }))
    }
  }

  return { questions, isQuestionnaireCompleteLoading: isLoading, questionnaireCompleteError: error }
}
