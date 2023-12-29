import ImmunizationsModal from "./modals/ImmunizationsModal";
import {TextList} from "../../componentLibrary/TextList";
import { Icon } from '@ui-kitten/components';
import {useState} from "react";
import MedicationsModal from "./modals/MedicationsModal";
import AllergiesModal from "./modals/AllergiesModal";
import ConditionsModal from "./modals/ConditionsModal";
import GoalsModal from "./modals/GoalsModal";


const RecordsScreen = () => {
  const [showAllergies, setShowAllergies] = useState(false);
  const [showConditions, setShowConditions] = useState(false);
  const [showGoals, setShowGoals] = useState(false);
  const [showImmunizations, setShowImmunizations] = useState(false);
  const [showMedications, setShowMedications] = useState(false);

  const contentItems = [
    {
      title: 'Goals',
      leftIcon: <Icon name='flag-outline' />,
      isDisabled: false,
      onPress: () => setShowGoals(true),
    },
    {
      title: 'Allergies',
      leftIcon: <Icon name='close-square-outline' />,
      isDisabled: false,
      onPress: () => setShowAllergies(true),
    },
    {
      title: 'Conditions',
      leftIcon: <Icon name='thermometer-outline' />,
      isDisabled: false,
      onPress: () => setShowConditions(true),
    },
    {
      title: 'Medications',
      leftIcon: <Icon name='archive-outline' />,
      isDisabled: false,
      onPress: () => setShowMedications(true),
    },
    {
      title: 'Immunizations',
      leftIcon: <Icon name='activity-outline' />,
      isDisabled: false,
      onPress: () => setShowImmunizations(true),
    },
    // {
    //   title: 'Active Consents',
    //   leftIcon: <Icon name='folder-outline' />,
    //   isDisabled: false,
    // },
    // {
    //   title: 'Questionnaires',
    //   leftIcon: <Icon name='question-mark' />,
    //   isDisabled: false,
    // },
  ]

  return (
    <>
      <TextList items={contentItems} />

      {showAllergies && <AllergiesModal onClose={() => setShowAllergies(false)} /> }
      {showConditions && <ConditionsModal onClose={() => setShowConditions(false)} /> }
      {showGoals && <GoalsModal onClose={() => setShowGoals(false)} /> }
      {showImmunizations && <ImmunizationsModal onClose={() => setShowImmunizations(false)} /> }
      {showMedications && <MedicationsModal onClose={() => setShowMedications(false)} /> }
    </>
  )
}
export default RecordsScreen;
