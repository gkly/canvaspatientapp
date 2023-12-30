import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {ApplicationProvider, Icon, IconRegistry} from '@ui-kitten/components';
import MedicalHistory from './modules/medicalHistory/MedicalHistory';
import Home from "./modules/home/Home";
import Account from "./modules/account/Account";
import Messaging from "./modules/messaging/Messaging";
import {Image, StyleSheet} from "react-native";
import { StripeProvider } from '@stripe/stripe-react-native';
import {useEffect} from "react";
import {useTranslation} from "react-i18next";
import "./i18n";

// TODO nice to have theme https://akveo.github.io/react-native-ui-kitten/docs/guides/branding#primary-color


const queryClient = new QueryClient()
const Tab = createBottomTabNavigator();

export default function App() {
  const { t, i18n } = useTranslation();
  // useEffect(() => {
  //   console.log('App useEffect')
  // }, []);


  const screenOptions = {
    // TODO fix onpress
    headerRight: () => <Image source={require('./assets/canvaslogo3.png')} style={styles.image} onPress={() => console.log('make go to home')} />,
    headerTitleStyle: {
      color: 'rgb(255, 255, 255)',
    },
    headerStyle: {
      backgroundColor: 'rgb(106,150,192)',
    },
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <QueryClientProvider client={queryClient}>
          <StripeProvider
            publishableKey="pk_test_TYooMQauvdEDq54NiTphI7jx"
            urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
            merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
          >
            <NavigationContainer>
              <Tab.Navigator screenOptions={({ route }) => ({
                tabBarActiveTintColor: 'rgb(255, 255, 255)',
                tabBarInactiveTintColor: 'black',
                tabBarActiveBackgroundColor: 'rgb(106,150,192)',
              })}>
                <Tab.Group>
                  <Tab.Screen
                    name={t('nav-home')}
                    component={Home}
                    options={{
                      headerShown: false,
                      tabBarIcon: ({color}) => <Icon style={styles.icon} name='home-outline' fill={color} />,
                      // tabBarBadge: 1,
                      headerTitleStyle: {
                        color: 'rgb(255, 255, 255)',
                      },
                      headerStyle: {
                        backgroundColor: 'rgb(106,150,192)',
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
          </StripeProvider>
        </QueryClientProvider>
      </ApplicationProvider>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    // fill: 'rgba(0, 0, 255, 1)',
    // color: 'rgba(0, 0, 255, 1)',
    // outlineColor: 'rgba(0, 0, 255, 1)',
    width: 25,
    height: 25,
  },
  image: {
    width: 17,
    height: 35,
    marginRight: 15,
  },
})
