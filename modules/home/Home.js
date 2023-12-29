import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import Appointments from "../appointments/Appointments";
import Onboarding from "../onboarding/Onboarding";
import {useCallback, useEffect, useState} from "react";
import { RefreshControl } from 'react-native';
import Welcome from "./Welcome";
import {useQueryClient} from "@tanstack/react-query";
import {useIsOnboardingComplete} from "../../hooks/composite/useIsOnboardingComplete";
import {Button} from "@ui-kitten/components";
import Card from "../../componentLibrary/Card";
import HeaderText from "../../componentLibrary/HeaderText";
import {useGetPatient} from "../../hooks/resourceBased/useGetPatient";

const Home = () => {
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const {isOnboardingComplete, isOnboardingCompleteLoading, onboardingCompleteError} = useIsOnboardingComplete();
  const { name } = useGetPatient();
  const nameToDisplay = name?.firstNamePreferred || name?.firstNameLegal;
  const welcomeMessage = nameToDisplay ? `Hello ${nameToDisplay}!` : 'Hello!';

  useEffect(() => {
    if(!isOnboardingCompleteLoading && !onboardingCompleteError && !isOnboardingComplete) {
      setShowOnboardingModal(true);
    }
  }, [isOnboardingComplete, isOnboardingCompleteLoading, onboardingCompleteError]);


  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    queryClient.invalidateQueries().then(setRefreshing(false))
  }, []);

  return (
    <>
      {/*<View style={styles.header}>*/}
      {/*  <Image source={require('../../assets/canvaslogo.png')} style={styles.image} />*/}
      {/*  <Text style={styles.tagline}>Rooted in Empathy, Aided by Technology.</Text>*/}
      {/*</View>*/}
      {/*<View style={styles.personalized}>*/}
      {/*  <View style={styles.row}>*/}
      {/*    <Image source={{uri: photo}} style={styles.profileImage}/>*/}
      {/*    <HeaderText title={welcomeMessage} showLine={false} secondaryColor={false} />*/}
      {/*  </View>*/}
      {/*</View>*/}
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/*<Image source={require('../../assets/canvaslogo.png')} style={styles.image} />*/}
        {/*<Text>Rooted in Empathy, Aided by Technology.</Text>*/}
        <HeaderText title={welcomeMessage} showLine={false} secondaryColor={false} />
        {!isOnboardingComplete && (
          <Card title='Finish onboarding' iconName='edit-2-outline' onPress={() => setShowOnboardingModal(true)} />
          // <Button
          //   style={styles.onboardingButton}
          //   onPress={() => setShowOnboardingModal(true)}>
          //   Finish onboarding
          // </Button>
        )}
        {showOnboardingModal && <Onboarding onClose={() => setShowOnboardingModal(false)} />}
        <Appointments />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  content: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 15,
    // marginVertical: 10,
    marginBottom: 20,
  },
  logo: {
    height: 50,
    width: '80%',
  },
  onboardingButton: {
    marginTop: 10,
    padding: 50
  },
  header: {
    backgroundColor: 'rgba(106,150,192, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    height: 250,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  // image: {
  //   width: 150,
  //   height: 30,
  //   marginVertical: 10,
  // },
  image: {
    width: 100,
    height: 20,
    marginVertical: 10,
  },
  personalized: {
    // flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  tagline: {
    fontStyle: 'italic',
    color: 'rgb(255, 255, 255)',
  }
});

export default Home;
