import moment from 'moment';
import { useState } from 'react';
// TODO: reconcile react-native vs ui kitten components
import { StyleSheet } from 'react-native';
import { Button, Datepicker, IndexPath } from '@ui-kitten/components';
import { MomentDateService } from '@ui-kitten/moment';
import InputText from '../../componentLibrary/InputText';
import LabelWrapper from '../../componentLibrary/LabelWrapper';
import InputDropdown from "../../componentLibrary/InputDropdown";
import Modal from "../../componentLibrary/Modal";

const sexDropdownOptions = [
  'Female',
  'Male',
  'Other',
  'Unknown',
]

const dateService = new MomentDateService();

type Props = {
  onClose: () => void,
}

const CreateProfileModal = ({onClose}: Props) => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const sex = sexDropdownOptions[selectedIndex.row];
  const [dob, setDOB] = useState(moment());

  // TODO: string validation (alphabet only for names); remove default dropdown value
  const isFormComplete = (firstName && lastName && phoneNumber && sex && dob);

  const onSubmit = () => {
    // TODO validate and connect with API
    console.log('firstName=', firstName);
    console.log('lastName=', lastName);
    console.log('dob=', dob);
    console.log('sex=', sex);
    console.log('phoneNumber=', phoneNumber);
    // TODO toggle or checkbox for whether phone can accept text messages
  };

  return (
    <Modal
      isLoading={false}
      onClose={onClose}
      title='Create Profile'
    >
      <InputText
        label="First name"
        placeholder="John"
        value={firstName}
        onChange={input => setFirstName(input)}
        isSecureText={false}
        inputMode='text'
      />
      <InputText
        label="Last name"
        placeholder="Doe"
        value={lastName}
        onChange={input => setLastName(input)}
        isSecureText={false}
        inputMode='text'
      />
      <LabelWrapper label="Date of birth">
        <Datepicker
          placeholder='Select date'
          date={dob}
          dateService={dateService}
          onSelect={input => setDOB(input)}
        />
      </LabelWrapper>
      <InputDropdown
        label="Sex at birth"
        selectedIndex={selectedIndex}
        onChange={index => setSelectedIndex(index)}
        value={sex}
        optionNames={['Female', 'Male', 'Other', 'Unknown']}
      />
      <InputText
        label="Phone number"
        placeholder="123-456-7890"
        onChange={input => setPhoneNumber(input)}
        isSecureText={false}
        inputMode='tel'
      />
      {/*<Button title="Submit" onPress={onSubmit} style={styles.submitButton} />*/}
      <Button onPress={onSubmit} disabled={!isFormComplete}>
        Submit
      </Button>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: 'rgba(255, 255, 255, 1)',
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

export default CreateProfileModal;
