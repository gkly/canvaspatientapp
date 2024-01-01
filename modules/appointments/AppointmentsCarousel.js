import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {Icon} from "@ui-kitten/components";
import SpinnerWrapper from "../../componentLibrary/SpinnerWrapper";
import EmptyText from "../../componentLibrary/EmptyText";
import {useGetAppointments} from "../../hooks/resourceBased/useGetAppointments";
import {loadInBrowser} from "../../utils/helpers";
import CaptionText from "../../componentLibrary/CaptionText";
import React from "react";
import {APPOINTMENT_TEMPORAL_FILTERS, APPOINTMENT_TYPES, PRIMARY_COLORS, SECONDARY_COLORS} from "../../utils/constants";
import {useTranslation} from "react-i18next";
import LoadMoreButton from "../../componentLibrary/LoadMoreButton";


const AppointmentsCarousel = ({ filter }) => {
  const { t } = useTranslation();

  let date, comparator, title;
  if (filter === APPOINTMENT_TEMPORAL_FILTERS.PAST) {
    date = new Date();
    comparator = 'lt';
    title = t('home-pastappointments');
  } else if (filter === APPOINTMENT_TEMPORAL_FILTERS.UPCOMING) {
    date = new Date();
    comparator = 'ge';
    title = t('home-upcomingappointments');
  } else {
    return null;
  }

  const { appointments, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage }  = useGetAppointments(date, comparator);

  const noAppointments = !isLoading && appointments.length === 0;
  const appointmentCards = appointments.map(a => {
    const isTelemedicine = a.type === APPOINTMENT_TYPES.TELEMEDICINE;
    const appointmentType = t(a.type);
    const isPressable = isTelemedicine && (filter === APPOINTMENT_TEMPORAL_FILTERS.UPCOMING);
    const color = isPressable ? PRIMARY_COLORS.BLUE : SECONDARY_COLORS.GREY;

    return (
      <Pressable
        style={{...styles.cardContainer, borderColor: color}}
        onPress={() => loadInBrowser(a.url)}
        disabled={!isPressable}
        key={`${a.description}-${a.dateForDisplay}`}
      >
        <View style={{...styles.card, justifyContent: isPressable ? 'space-between' : 'start'}}>
          <View style={{...styles.leftIconContainer, backgroundColor: color}} >
            <Icon
              name={isTelemedicine ? 'video' : 'home'}
              fill='rgb(255, 255, 255)'
              style={styles.icon}
            />
          </View>
          <View style={styles.cardContent}>
            <CaptionText text={a.description} type={isPressable ? 'primary' : 'tertiary'} capitalize={false} />
            <Text>{a.dateForDisplay}</Text>
            <Text>{a.timeRangeForDisplay}</Text>
            <Text style={styles.type}>{appointmentType}</Text>
          </View>
          {isPressable && (
            <View style={styles.rightIconContainer}>
              <Icon name='arrow-ios-forward' style={styles.icon} fill={PRIMARY_COLORS.BLUE}/>
            </View>
          )}
        </View>
      </Pressable>
    )
  })

  return (
    <View style={styles.container}>
      {
        noAppointments ? <EmptyText name={title} plural={true} /> : (
          <>
            <CaptionText text={title} />
            <ScrollView horizontal style={styles.carousel}>
              {appointmentCards}
            </ScrollView>

            {hasNextPage && (
              <LoadMoreButton isLoading={isFetchingNextPage} onPress={fetchNextPage} />
            )}
            {isLoading && <SpinnerWrapper />}
          </>
        )
      }
    </View>
  )
}

export default AppointmentsCarousel;

const styles = StyleSheet.create({
  container: {
    maxHeight: 200,
  },
  carousel: {
    marginBottom: 10,
  },
  cardContainer: {
    borderWidth: 2,
    // minWidth: 250,
    width: 275,
    marginHorizontal: 5,
    flex: 1,
    borderRadius: 20,
  },
  card: {
    flexDirection: 'row',
  },
  cardContent: {
    padding: 10,
  },
  type: {
    fontStyle: 'italic',
    marginVertical: 5,
  },
  leftIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    width: 75,
  },
  icon: {
    width: 25,
    height: 25,
  },
  rightIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
  },
});