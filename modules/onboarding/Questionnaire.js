import moment from 'moment';
import { useState } from 'react';
// TODO: reconcile react-native vs ui kitten components
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Button, Datepicker, IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';
import { MomentDateService } from '@ui-kitten/moment';
import InputText from '../../componentLibrary/InputText';
import LabelWrapper from '../../componentLibrary/LabelWrapper';
import InputDropdown from "../../componentLibrary/InputDropdown";

const dateService = new MomentDateService();

type Option = {
  system: string,
  code: string,
  display: string,
}

type Question = {

}

type Props = {
  name: string,
  description: string,
  questions: Question[],
}

const Questionnaire = ({ name, description, questions }: Props) => {
  const questionsMapping = questions.reduce((qAcc, q) => {
    const questionText = q.text;
    const optionsMapping = q.answerOption.reduce((oAcc, o) => {
      const optionText = o["valueCoding"]["display"]
      oAcc[optionText] = o
    }, {});

    qAcc[questionText] = {
      ...q,
      answerOption: optionsMapping,
    }
  }, {})


  const [formValues, setFormValues] = useState({});
  const [selectedIndices, setSelectedIndices] = useState({});
  const getAnswer = (question) => formValues?.[question] || "";
  const updateAnswer = (question, answer, type) => {
    if (type === 'choice') {
      setFormValues(formValues => {return {...formValues, question: answer}});
    } else {

    }
  }

  // TODO
  const isFormComplete = () => true;

  const onSubmit = () => {

  };

  return (
    <ScrollView style={styles.container}>
      {
        questions.map(q => {
          const questionText = q.text;
          if (q.type === 'choice') {
            // const questionOptionsText = q?.answerOption?.map(o => o.valueCoding.display);
            // return (
            //   <InputDropdown
            //     label={q.text}
            //     selectedIndex={}
            //     value={}
            //     onChange={}
            //     optionNames={questionOptionsText} />
            // )
          } else {
            return (
              <InputText
                label={questionText}
                value={getAnswer(questionText)}
                onChange={(response) => updateAnswer(questionText, response)}
              />
            )
          }
        })
      }
      {/*<Button title="Submit" onPress={onSubmit} style={styles.submitButton} />*/}
      <Button onPress={onSubmit} disabled={!isFormComplete}>
        Submit
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    // marginBottom: 10,
    minWidth: 150,
    maxWidth: 250
  },
  datepickerContainer: {
    // minHeight: 376,
  },
  dropdownContainer: {
    // minHeight: 128,
  },
  submitButton: {
    padding: 50, // Increased button size
  },
  successText: {
    color: 'green',
    marginTop: 10,
    fontSize: 17,
  },
});

export default Questionnaire;
