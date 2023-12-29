import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {Button, Icon} from "@ui-kitten/components";
import SpinnerWrapper from "../../componentLibrary/SpinnerWrapper";
import ErrorText from "../../componentLibrary/ErrorText";
import EmptyText from "../../componentLibrary/EmptyText";
import {useGetAppointments} from "../../hooks/resourceBased/useGetAppointments";
import {loadInBrowser} from "../../utils/network_request_helpers";
import CaptionText from "../../componentLibrary/CaptionText";
import React from "react";
import {APPOINTMENT_TEMPORAL_FILTERS, APPOINTMENT_TYPES} from "../../utils/constants";


const AppointmentsCarousel = ({ filter }) => {
  let date, comparator;
  if (filter === APPOINTMENT_TEMPORAL_FILTERS.PAST) {
    date = new Date();
    comparator = 'lt';
  } else if (filter === APPOINTMENT_TEMPORAL_FILTERS.UPCOMING) {
    date = new Date();
    comparator = 'ge';
  } else {
    return null;
  }

  const title = filter + ' appointments';

  const { appointments, error, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage }  = useGetAppointments(date, comparator);

  const noAppointments = !isLoading && !error && appointments.length === 0;
  const appointmentCards = appointments.map(a => {
    const isTelemedicine = a.type === APPOINTMENT_TYPES.TELEMEDICINE;
    const isPressable = isTelemedicine && (filter === APPOINTMENT_TEMPORAL_FILTERS.UPCOMING);
    const color = isPressable ? 'rgb(106,150,192)' : 'rgb(171,168,168)';

    // TODO make text wraparound when too long
    return (
      <Pressable
        style={{...styles.cardContainer, borderColor: color}}
        onPress={() => loadInBrowser(a.url)}
        disabled={!isPressable}
      >
        <View style={styles.card}>
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
            <Text style={styles.type}>{a.type}</Text>
          </View>
          {isPressable && (
            <View style={styles.rightIconContainer}>
              <Icon name='arrow-ios-forward' style={styles.icon} fill='rgb(106,150,192)'/>
            </View>
          )}
        </View>

      </Pressable>
    )
  })

  const buttonText = isFetchingNextPage ? "Loading..." : "Load More";

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
              <Button
                onPress={fetchNextPage}
                appearance='outline'
                disabled={isFetchingNextPage}
              >
                {buttonText}
              </Button>
            )}
            {isLoading && <SpinnerWrapper />}
            {error && <ErrorText message={error.message} />}
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
    minWidth: 250,
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