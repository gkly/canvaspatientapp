import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileScreen from "./ProfileScreen";
import BillingScreen from "./BillingScreen";
import {useTranslation} from "react-i18next";


const Tab = createMaterialTopTabNavigator();


const Account = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={t('account-profile')}
        component={ProfileScreen}
        options={{
          tabBarIndicatorStyle: {
            backgroundColor: 'rgb(106,150,192)',
          }
        }}
      />
      <Tab.Screen
        name={t('account-billing')}
        component={BillingScreen}
        options={{
          tabBarIndicatorStyle: {
            backgroundColor: 'rgb(106,150,192)',
          }
        }}
      />
    </Tab.Navigator>
  );
};

export default Account;
