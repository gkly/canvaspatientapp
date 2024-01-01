import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileScreen from "./ProfileScreen";
import BillingScreen from "./BillingScreen";
import {useTranslation} from "react-i18next";
import {PRIMARY_COLORS} from "../../utils/constants";


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
            backgroundColor: PRIMARY_COLORS.BLUE,
          }
        }}
      />
      <Tab.Screen
        name={t('account-billing')}
        component={BillingScreen}
        options={{
          tabBarIndicatorStyle: {
            backgroundColor: PRIMARY_COLORS.BLUE,
          }
        }}
      />
    </Tab.Navigator>
  );
};

export default Account;
