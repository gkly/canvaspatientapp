import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyRecordsScreen from "./MyRecordsScreen";
import MyReportsScreen from "./MyReportsScreen";
import {useTranslation} from "react-i18next";

const Tab = createMaterialTopTabNavigator();


const MedicalHistory = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={t('medhistory-overview')}
        component={MyRecordsScreen}
        options={{
          tabBarIndicatorStyle: {
            backgroundColor: 'rgb(106,150,192)',
          }
        }}
      />
      <Tab.Screen
        name={t('medhistory-reports')}
        component={MyReportsScreen}
        options={{
          tabBarIndicatorStyle: {
            backgroundColor: 'rgb(106,150,192)',
          }
        }}
      />
    </Tab.Navigator>
  );
};

export default MedicalHistory;
