import { useState } from 'react';
// TODO: reconcile react-native vs ui kitten components
import { StyleSheet } from 'react-native';
import { Button, IndexPath } from '@ui-kitten/components';
import InputDropdown from '../../../componentLibrary/InputDropdown';
import ErrorText from "../../../componentLibrary/ErrorText";
import {useMutation} from "@tanstack/react-query";
import {PATIENT_ID, QUESTIONNAIRE_ID, RESOURCES} from "../../../utils/constants";
import {getUrlForResource, postRequest} from "../../../utils/network_request_helpers";
import {TextList} from "../../../componentLibrary/TextList";
import {useQueryClient} from "@tanstack/react-query";
import {formatReferenceResource} from "../../../utils/formatters";
import Modal from "../../../componentLibrary/Modal";


const TITLE = 'AUDIT-C';
const DESCRIPTION = 'The Alcohol Use Disorders Identification Test-Consumption (AUDIT-C) is a brief validated screen for risky drinking and alcohol abuse and dependence (alcohol misuse).';
const QUESTIONS = {
  FREQUENCY: {
    ID: 'e40bda8f-a334-42fb-82fc-c059208ca310',
    TEXT: 'How often do you have a drink containing alcohol?',
    OPTIONS: {
      'Never': {
        valueCoding:{
          system:'http://loinc.org',
          code:'LA6270-8',
          display:'Never'
        }
      },
      'Monthly or less': {
        valueCoding:{
          system:'http://loinc.org',
          code:'LA18926-8',
          display:'Monthly or less'
        }
      },
      '2-4 times a month': {
        valueCoding:{
          system:'http://loinc.org',
          code:'LA18927-6',
          display:'2-4 times a month'
        }
      },
      '2-3 times a week': {
        valueCoding:{
          system:'http://loinc.org',
          code:'LA18928-4',
          display:'2-3 times a week'
        }
      },
      '5 or more times a week': {
        valueCoding:{
          system:'http://loinc.org',
          code:'LA18929-2',
          display:'5 or more times a week'
        }
      },
    }
  },
  VOLUME: {
    ID: '668ca199-e651-40a8-b6cd-0872fde2f92d',
    TEXT: 'How many drinks did you have on a typical day when you were drinking in the past year?',
    OPTIONS: {
      '2 or fewer': {
        valueCoding: {
          system: 'http://loinc.org',
          code: 'LA15694-5',
          display: '2 or fewer'
        }
      },
      '3 or 4': {
        valueCoding:{
          system:'http://loinc.org',
          code:'LA15695-2',
          display:'3 or 4'
        }
      },
      '5 or 6': {
        valueCoding:{
          system:'http://loinc.org',
          code:'LA18930-0',
          display:'5 or 6'
        }
      },
      '7 to 9': {
        valueCoding:{
          system:'http://loinc.org',
          code:'LA18931-8',
          display:'7 to 9'
        }
      },
      '10 or more': {
        valueCoding:{
          system:'http://loinc.org',
          code:'LA18932-6',
          display:'10 or more'
        }
      },
    }
  },
  BINGE: {
    ID: '0d9f748a-de6d-4dce-bc81-a8b174267026',
    TEXT: 'How often do you have 6 or more drinks on 1 occasion?',
    OPTIONS: {
      'Never': {
        valueCoding:{
          system:'http://loinc.org',
          code:'LA6270-8',
          display:'Never'
        }
      },
      'Less than monthly': {
        valueCoding:{
          system:'http://loinc.org',
          code:'LA18933-4',
          display:'Less than monthly'
        }
      },
      'Monthly': {
        valueCoding:{
          system:'http://loinc.org',
          code:'LA18876-5',
          display:'Monthly'
        }
      },
      'Weekly': {
        valueCoding:{
          system:'http://loinc.org',
          code:'LA18891-4',
          display:'Weekly'
        }
      },
      'Daily or almost daily': {
        valueCoding:{
          system:'http://loinc.org',
          code:'LA18934-2',
          display:'Daily or almost daily'
        }
      },
    }
  }
}

type Props = {
  onClose: () => void,
  // TODO questionResponses:
}

const AuditCQuestionnaireModal = ({ onClose, questionResponses }: Props) => {
  const queryClient = useQueryClient();
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [submitErrorMsg, setSubmitErrorMsg] = useState();
  const [frequencySelectedIndex, setFrequencySelectedIndex] = useState(new IndexPath(0));
  const frequency = Object.keys(QUESTIONS.FREQUENCY.OPTIONS)[frequencySelectedIndex.row];
  const [volumeSelectedIndex, setVolumeSelectedIndex] = useState(new IndexPath(0));
  const volume = Object.keys(QUESTIONS.VOLUME.OPTIONS)[volumeSelectedIndex.row];
  const [bingeSelectedIndex, setBingeSelectedIndex] = useState(new IndexPath(0));
  const binge = Object.keys(QUESTIONS.BINGE.OPTIONS)[bingeSelectedIndex.row];

  const submitQuestionnaire = useMutation({
    mutationFn: ({frequency, volume, binge}) =>
      postRequest(getUrlForResource(RESOURCES.QUESTIONNAIRE_RESPONSE),{
        resourceType: RESOURCES.QUESTIONNAIRE_RESPONSE,
        questionnaire: formatReferenceResource(RESOURCES.QUESTIONNAIRE, QUESTIONNAIRE_ID),
        status: 'completed',
        subject: {
          reference: formatReferenceResource(RESOURCES.PATIENT, PATIENT_ID),
          type: RESOURCES.PATIENT
        },
        item: [
          {
            linkId: QUESTIONS.FREQUENCY.ID,
            text: QUESTIONS.FREQUENCY.TEXT,
            answer: [QUESTIONS.FREQUENCY.OPTIONS[frequency]]
          },
          {
            linkId: QUESTIONS.VOLUME.ID,
            text: QUESTIONS.VOLUME.TEXT,
            answer: [QUESTIONS.VOLUME.OPTIONS[volume]]
          },
          {
            linkId: QUESTIONS.BINGE.ID,
            text: QUESTIONS.BINGE.TEXT,
            answer: [QUESTIONS.FREQUENCY.OPTIONS[binge]]
          },
        ]
    }),
  })


  const onSubmit = () => {
    submitQuestionnaire.mutate({frequency, volume, binge}, {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: [RESOURCES.QUESTIONNAIRE_RESPONSE]});
        onClose();
      },
    })
  }

  const questionResponseItems = questionResponses.map(q => ({
    title: q.question,
    description: q.answer,
    isDisabled: true,
  }));

  return (questionResponseItems.length > 0) ? (
    <Modal
      isLoading={false}
      onClose={onClose}
      title={TITLE}
      scrollView={false} // since textlist is already supporting vertical scroll
    >
      <TextList items={questionResponseItems} resource={RESOURCES.QUESTIONNAIRE_RESPONSE} />
    </Modal>
  ) : (
    <Modal
      isLoading={false}
      onClose={onClose}
      title={TITLE}
      description={DESCRIPTION}
    >
      <InputDropdown
        label={QUESTIONS.FREQUENCY.TEXT}
        selectedIndex={frequencySelectedIndex}
        value={frequency}
        onChange={index => setFrequencySelectedIndex(index)}
        optionNames={Object.keys(QUESTIONS.FREQUENCY.OPTIONS)}
      />
      <InputDropdown
        label={QUESTIONS.VOLUME.TEXT}
        selectedIndex={volumeSelectedIndex}
        value={volume}
        onChange={index => setVolumeSelectedIndex(index)}
        optionNames={Object.keys(QUESTIONS.VOLUME.OPTIONS)}
      />
      <InputDropdown
        label={QUESTIONS.BINGE.TEXT}
        selectedIndex={bingeSelectedIndex}
        value={binge}
        onChange={index => setBingeSelectedIndex(index)}
        optionNames={Object.keys(QUESTIONS.BINGE.OPTIONS)}
      />

      <Button style={styles.submitButton} onPress={onSubmit} disabled={submitIsLoading}>
        Submit
      </Button>
      {submitErrorMsg && <ErrorText message={submitErrorMsg}/>}
    </Modal>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    padding: 50, // Increased button size
  },
});

export default AuditCQuestionnaireModal;
