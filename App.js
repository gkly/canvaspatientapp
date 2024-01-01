import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {ApplicationProvider, Icon, IconRegistry} from '@ui-kitten/components';
import {Image, StyleSheet} from "react-native";
import {useTranslation} from "react-i18next";
import { ErrorBoundary } from 'react-error-boundary';
import Toast from 'react-native-toast-message';

import "./i18n";
import {PRIMARY_COLORS} from "./utils/constants";
import MedicalHistory from './modules/medicalHistory/MedicalHistory';
import Home from "./modules/home/Home";
import Account from "./modules/account/Account";
import Messaging from "./modules/messaging/Messaging";
import ErrorText from "./componentLibrary/ErrorText";


const queryClient = new QueryClient()
const Tab = createBottomTabNavigator();

const App = () => {
  const { t } = useTranslation();

  const screenOptions = {
    headerRight: () => <Image source={require('./assets/canvaslogo3.png')} style={styles.image} />,
    headerTitleStyle: {
      color: PRIMARY_COLORS.WHITE,
    },
    headerStyle: {
      backgroundColor: PRIMARY_COLORS.BLUE,
    },
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary FallbackComponent={ErrorText}>
            <NavigationContainer>
              <Tab.Navigator screenOptions={({ route }) => ({
                tabBarActiveTintColor: PRIMARY_COLORS.WHITE,
                tabBarInactiveTintColor: 'black',
                tabBarActiveBackgroundColor: PRIMARY_COLORS.BLUE,
              })}>
                <Tab.Group>
                  <Tab.Screen
                    name={t('nav-home')}
                    component={Home}
                    options={{
                      headerShown: false,
                      tabBarIcon: ({color}) => <Icon style={styles.icon} name='home-outline' fill={color} />,
                      headerTitleStyle: {
                        color: PRIMARY_COLORS.WHITE,
                      },
                      headerStyle: {
                        backgroundColor: PRIMARY_COLORS.BLUE,
                      },
                    }}

                  />
                  <Tab.Screen
                    name={t('nav-messaging')}
                    component={Messaging}
                    options={{
                      tabBarIcon: ({color}) => <Icon style={styles.icon} name='message-circle' fill={color} />,
                      ...screenOptions,
                    }}
                  />
                  <Tab.Screen
                    name={t('nav-medhistory')}
                    component={MedicalHistory}
                    options={{
                      tabBarIcon: ({color}) => <Icon style={styles.icon} name='activity-outline' fill={color} />,
                      ...screenOptions,
                    }}
                  />
                  <Tab.Screen
                    name={t('nav-account')}
                    component={Account}
                    options={{
                      tabBarIcon: ({color}) => <Icon style={styles.icon} name='person-outline' fill={color} />,
                      ...screenOptions,
                    }}
                  />
                </Tab.Group>
              </Tab.Navigator>
            </NavigationContainer>
          </ErrorBoundary>
        </QueryClientProvider>
      </ApplicationProvider>
      <Toast />
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
  image: {
    width: 17,
    height: 35,
    marginRight: 15,
  },
})
