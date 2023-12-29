import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileScreen from "./ProfileScreen";
import BillingScreen from "./BillingScreen";


const Tab = createMaterialTopTabNavigator();


const Account = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIndicatorStyle: {
            backgroundColor: 'rgb(106,150,192)',
          }
        }}
      />
      <Tab.Screen
        name="Billing"
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
