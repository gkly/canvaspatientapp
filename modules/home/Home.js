import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import Appointments from "../appointments/Appointments";
import Onboarding from "../onboarding/Onboarding";
import {useCallback, useEffect, useState} from "react";
import { RefreshControl } from 'react-native';
import {useQueryClient} from "@tanstack/react-query";
import {useIsOnboardingComplete} from "../../hooks/composite/useIsOnboardingComplete";
import { useTranslation} from 'react-i18next';
import WelcomeCard from "./WelcomeCard";
import CareTeamCard from "./CareTeamCard";
import {LANGUAGE_CODES_SUPPORTED, SECONDARY_COLORS} from "../../utils/constants";
import {Icon} from "@ui-kitten/components";
import {useGetPatient} from "../../hooks/resourceBased/useGetPatient";

const Home = () => {
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const {isOnboardingComplete, isOnboardingCompleteLoading, onboardingCompleteError} = useIsOnboardingComplete();
  const { i18n, t } = useTranslation();
  const { language } = useGetPatient();
  const languageCode = language?.code;

  useEffect(() => {
    if(LANGUAGE_CODES_SUPPORTED.includes(languageCode)) {
      i18n.changeLanguage(languageCode);
    }
  }, [languageCode]);

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
      <WelcomeCard />
      <CareTeamCard />

      {!isOnboardingComplete && (
        <Pressable style={styles.onboarding} onPress={() => setShowOnboardingModal(true)}>
          <Text style={styles.onboardingText}>{t('home-finishonboarding')}</Text>
          <View style={styles.rightIconContainer}>
            <Icon name='arrow-ios-forward' style={styles.icon} fill={SECONDARY_COLORS.NAVY}/>
          </View>
        </Pressable>
      )}
      {showOnboardingModal && <Onboarding onClose={() => setShowOnboardingModal(false)} />}

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
    marginBottom: 10,
  },
  onboarding: {
    paddingHorizontal: 20,
    backgroundColor: SECONDARY_COLORS.GREY,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    flexDirection: 'row',
  },
  onboardingText: {
    color: SECONDARY_COLORS.NAVY,
    fontWeight: 'bold',
    fontSize: 15,
  },
  icon: {
    width: 25,
    height: 25,
  },
  header: {
    backgroundColor: 'rgba(106,150,192, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    height: 220,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  image: {
    width: 100,
    height: 20,
    marginVertical: 10,
  },
  personalized: {
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
