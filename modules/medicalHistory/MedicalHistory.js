import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyRecordsScreen from "./MyRecordsScreen";
import MyReportsScreen from "./MyReportsScreen";

const Tab = createMaterialTopTabNavigator();


const MedicalHistory = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Overview"
        component={MyRecordsScreen}
        options={{
          tabBarIndicatorStyle: {
            backgroundColor: 'rgb(106,150,192)',
          }
        }}
      />
      <Tab.Screen
        name="Reports"
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
