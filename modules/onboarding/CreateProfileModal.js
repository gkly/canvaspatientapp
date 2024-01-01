import moment from 'moment';
import React, { useState } from 'react';
import { Datepicker, IndexPath } from '@ui-kitten/components';
import { MomentDateService } from '@ui-kitten/moment';
import InputText from '../../componentLibrary/InputText';
import LabelWrapper from '../../componentLibrary/LabelWrapper';
import InputDropdown from "../../componentLibrary/InputDropdown";
import Modal from "../../componentLibrary/Modal";
import Button from "../../componentLibrary/Button";

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
      scrollView={true}
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
      <Button
        text='Submit'
        type='filled'
        onPress={onSubmit}
        disabled={!isFormComplete}
      />
    </Modal>
  );
};

export default CreateProfileModal;
