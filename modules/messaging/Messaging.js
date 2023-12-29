import {KeyboardAvoidingView, RefreshControl, ScrollView, StyleSheet, View} from "react-native";
import InputButton from "../../componentLibrary/InputButton";
import {useCallback, useEffect, useState} from "react";
import Message from "./Message";
import {useGetMessages} from "../../hooks/resourceBased/useGetMessages";
import {Button} from "@ui-kitten/components";
import {PATIENT_ID, PROVIDER_ID, RESOURCES} from "../../utils/constants";
import {getUrlForResource, postRequest} from "../../utils/network_request_helpers";
import ErrorText from "../../componentLibrary/ErrorText";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {isTextEmpty} from "../../utils/helpers";
import {formatReferenceResource} from "../../utils/formatters";


const Messaging = () => {
  const { data, error, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage }  = useGetMessages();
  const [messageDraft, setMessageDraft] = useState();
  const [allMessages, setAllMessages] = useState([]);

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
    })
  }

  useEffect(() => {
    if (data && data.length > allMessages.length) {
      setAllMessages(data);
    }
  }, [data]);

  const buttonText = isFetchingNextPage ? "Loading..." : "Load More";

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.history}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {hasNextPage && (
          <Button
            onPress={fetchNextPage}
            appearance='outline'
            disabled={isFetchingNextPage}
          >
            {buttonText}
          </Button>
        )}
        {
          allMessages.map(m => (
            <Message
              text={m.text}
              date={m.date.toLocaleString()}
              wasReceived={m.wasReceived}
            />
          ))
        }
      </ScrollView>
      {/*TODO fix for iOS (keyboard bllocks view)*/}
      <KeyboardAvoidingView style={styles.input}>
        <InputButton
         value={messageDraft}
         onChange={setMessageDraft}
         onPress={onSubmit}
         disabled={sendMessage.isPending || isTextEmpty(messageDraft)}
         errorMessage={undefined} // TODO hook up with mutation
        />
        {/*TODO fix formatting*/}
        {sendMessage.isError && <ErrorText message={'error!'}/>}
      </KeyboardAvoidingView>
    </View>
  )
}

export default Messaging;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    flex: 1,
    padding: 20,
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
    backgroundColor: 'rgb(106,150,192)',
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
