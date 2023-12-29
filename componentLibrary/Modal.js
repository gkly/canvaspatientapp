import {Alert, Modal, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View} from "react-native";
import InputText from "./InputText";
import {Icon} from "@ui-kitten/components";
import HeaderText from "./HeaderText";
import SpinnerWrapper from "./SpinnerWrapper";
import ErrorText from "./ErrorText";
import {useQueryClient} from "@tanstack/react-query";
import {useCallback, useState} from "react";

const ModalCustom = ({title, description, children, onClose, isLoading, errorMessage, scrollView=true}) => {
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
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <Icon name='arrow-back-outline' onPress={onClose} style={styles.icon} fill='rgb(106,150,192)' />
            <HeaderText title={title} description={description}/>
          </View>

          {scrollView ? (
            <ScrollView
              style={styles.content}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {(!isLoading && !errorMessage) && children}
              {isLoading && <SpinnerWrapper/>}
              {errorMessage && <ErrorText message={errorMessage}/>}
            </ScrollView>
          ) : (
            <>
              {(!isLoading && !errorMessage) && children}
              {isLoading && <SpinnerWrapper/>}
              {errorMessage && <ErrorText message={errorMessage}/>}
            </>
          )}

        </View>
      </View>
    </Modal>
  )
}

export default ModalCustom;

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    // borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
    width: '100%',
    height: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
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
