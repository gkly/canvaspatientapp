import {Modal, RefreshControl, ScrollView, StyleSheet, View} from "react-native";
import {Icon} from "@ui-kitten/components";
import HeaderText from "./HeaderText";
import SpinnerWrapper from "./SpinnerWrapper";
import {useQueryClient} from "@tanstack/react-query";
import {useCallback, useState} from "react";
import {PRIMARY_COLORS} from "../utils/constants";

const ModalCustom = ({title, description, children, onClose, isLoading, scrollView=true}) => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    queryClient.invalidateQueries().then(setRefreshing(false))
  }, []);

  return (
    <Modal
      animationType="fade"
      visible={true}
      onRequestClose={onClose}>
      <View style={styles.modalView}>
        <View>
          <Icon name='arrow-back-outline' onPress={onClose} style={styles.icon} fill={PRIMARY_COLORS.BLUE} />
          <HeaderText title={title} description={description}/>
        </View>

        {scrollView ? (
          <ScrollView
            style={styles.content}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {!isLoading && children}
            {isLoading && <SpinnerWrapper/>}
          </ScrollView>
        ) : (
          <>
            {!isLoading && children}
            {isLoading && <SpinnerWrapper/>}
          </>
        )}
      </View>
    </Modal>
  )
}

export default ModalCustom;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: PRIMARY_COLORS.WHITE,
    padding: 35,
    width: '100%',
    height: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  container: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: '100%',
    height: '100%',
    padding: 20,
  },
  icon: {
    height: 30,
    width: 30,
  },
  content: {
    // paddingHorizontal: 5,
  },
});
