import {KeyboardAvoidingView, Platform, RefreshControl, ScrollView, StyleSheet, View} from "react-native";
import InputButton from "../../componentLibrary/InputButton";
import {useCallback, useEffect, useState} from "react";
import Message from "./Message";
import {useGetMessages} from "../../hooks/resourceBased/useGetMessages";
import {ERROR_MESSAGES, PATIENT_ID, PRIMARY_COLORS, PROVIDER_ID, RESOURCES} from "../../utils/constants";
import {getUrlForResource, postRequest} from "../../utils/network_request_helpers";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {isTextEmpty} from "../../utils/helpers";
import {formatReferenceResource} from "../../utils/formatters";
import LoadMoreButton from "../../componentLibrary/LoadMoreButton";
import Toast from "react-native-toast-message";
import SpinnerWrapper from "../../componentLibrary/SpinnerWrapper";
import {useKeyboard} from "../../hooks/basic/useGetKeyboardHeight";


const Messaging = () => {
  const { messages, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage }  = useGetMessages();
  const [messageDraft, setMessageDraft] = useState();
  const [allMessages, setAllMessages] = useState([]);
  const keyboardHeight = useKeyboard();

  //TODO inverse scrolling makes refresh weird
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    queryClient.invalidateQueries({queryKey: [RESOURCES.MESSAGE]})
      .then(setRefreshing(false))
  }, []);

  const sendMessage = useMutation({
    mutationFn: (messageDraft) =>
      postRequest(getUrlForResource(RESOURCES.MESSAGE),{
        resourceType: RESOURCES.MESSAGE,
        status: "unknown",
        recipient: [
          {
            reference: formatReferenceResource(RESOURCES.PROVIDER, PROVIDER_ID)
          }
        ],
        sender: {
          reference: formatReferenceResource(RESOURCES.PATIENT, PATIENT_ID)
        },
        payload: [
          {
            contentString: messageDraft,
          }
        ]
    }),
  })

  const onSubmit = () => {
    sendMessage.mutate(messageDraft, {
      onSuccess: () => {
        setMessageDraft(undefined);
        setAllMessages(allMessages => [
          {
            text: messageDraft,
            date: new Date(),
            wasReceived: false,
          },
          ...allMessages,
        ])
      }, // Canvas API does not return anything with successful POST
      onError: () => Toast.show({
        type: 'error',
        text1: ERROR_MESSAGES.CREATE_MESSAGE,
      })
    })
  }

  useEffect(() => {
    if (messages && messages.length > allMessages.length) {
      setAllMessages(messages);
    }
  }, [messages]);

  return isLoading ? <SpinnerWrapper /> : (
    <View style={styles.container}>
      <ScrollView
        style={{...styles.history, marginBottom: Platform.OS === 'ios' ? (keyboardHeight + 60): 0}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {hasNextPage && (
          <LoadMoreButton isLoading={isFetchingNextPage} onPress={fetchNextPage} />
        )}
        {
          allMessages.map(m => {
            const datetime = m.date.toLocaleString();
            return (
              <View key={datetime}>
                <Message
                  text={m.text}
                  datetime={datetime}
                  wasReceived={m.wasReceived}
                />
              </View>
            )
          })
        }
      </ScrollView>
      {/*TODO fix for iOS (keyboard blocks view)*/}
      <KeyboardAvoidingView style={{...styles.input, marginBottom: Platform.OS === 'ios' ? keyboardHeight: 0}}>
        <InputButton
         value={messageDraft}
         onChange={setMessageDraft}
         onPress={onSubmit}
         disabled={sendMessage.isPending || isTextEmpty(messageDraft)}
        />
      </KeyboardAvoidingView>
    </View>
  )
}

export default Messaging;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  history: {
    transform: [{ scaleY: -1 }],
    marginBottom: 50,
  },
  messageBubbleReceived: {
    transform: [{ scaleY: -1 }],
    borderRadius: 20,
    backgroundColor: 'rgb(133,147,161)',
    color: 'white',
    padding: 10,
    maxWidth: 200,
    marginVertical: 5,
  },
  messageBubbleSent: {
    alignSelf: 'flex-end',
    textAlign: 'right',
    transform: [{ scaleY: -1 }],
    borderRadius: 20,
    backgroundColor: PRIMARY_COLORS.BLUE,
    color: 'white',
    padding: 10,
    maxWidth: 200,
    marginVertical: 5,
  },
  input: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  }
});
