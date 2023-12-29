import { useCallback, useState } from 'react';
import {StyleSheet, ScrollView, View, RefreshControl} from 'react-native';
import HeaderText from "./HeaderText";
import {Icon, Modal} from "@ui-kitten/components";
import SpinnerWrapper from "./SpinnerWrapper";
import ErrorText from "./ErrorText";
import {useQueryClient} from "@tanstack/react-query";

type Props = {
  isLoading: boolean,
  errorMessage?: string,
  onClose: () => void,
  title: string,
  description?: string,
  scrollView?: boolean,
}

const ModalWrapper = ({isLoading, errorMessage, onClose, title, description, scrollView=true, children}: Props) => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    queryClient.invalidateQueries().then(setRefreshing(false))
  }, []);

  return (
    <Modal
      visible={true}
      onBackdropPress={onClose}
      style={styles.container}
    >
      <View style={styles.header}>
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
      )
    }
    </Modal>
  )
}

const styles = StyleSheet.create({
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
    paddingHorizontal: 5,
  },
});

export default ModalWrapper;
