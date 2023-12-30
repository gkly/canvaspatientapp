import ImmunizationsModal from "./modals/ImmunizationsModal";
import {TextList} from "../../componentLibrary/TextList";
import { Icon } from '@ui-kitten/components';
import {useState} from "react";
import MedicationsModal from "./modals/MedicationsModal";
import AllergiesModal from "./modals/AllergiesModal";
import ConditionsModal from "./modals/ConditionsModal";
import GoalsModal from "./modals/GoalsModal";
import {useTranslation} from "react-i18next";


const RecordsScreen = () => {
  const { t } = useTranslation();
  const [showAllergies, setShowAllergies] = useState(false);
  const [showConditions, setShowConditions] = useState(false);
  const [showGoals, setShowGoals] = useState(false);
  const [showImmunizations, setShowImmunizations] = useState(false);
  const [showMedications, setShowMedications] = useState(false);

  const contentItems = [
    {
      title: t('medhistory-overview-goals'),
      leftIcon: <Icon name='flag-outline' />,
      isDisabled: false,
      onPress: () => setShowGoals(true),
    },
    {
      title: t('medhistory-overview-allergies'),
      leftIcon: <Icon name='close-square-outline' />,
      isDisabled: false,
      onPress: () => setShowAllergies(true),
    },
    {
      title: t('medhistory-overview-conditions'),
      leftIcon: <Icon name='thermometer-outline' />,
      isDisabled: false,
      onPress: () => setShowConditions(true),
    },
    {
      title: t('medhistory-overview-medications'),
      leftIcon: <Icon name='archive-outline' />,
      isDisabled: false,
      onPress: () => setShowMedications(true),
    },
    {
      title: t('medhistory-overview-immunizations'),
      leftIcon: <Icon name='activity-outline' />,
      isDisabled: false,
      onPress: () => setShowImmunizations(true),
    },
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
