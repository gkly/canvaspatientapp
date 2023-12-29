import {RESOURCES, PATIENT_ID} from "../../utils/constants";
import {useGetInfiniteQuery} from "../basic/useGetInfiniteQuery";

export const useGetMessages = () => {
  const queryParamsAsRecipient = `recipient=Patient/${PATIENT_ID}`;
  const {
    data: dataAsRecipientRaw,
    error: errorAsRecipient,
    isLoading: isLoadingAsRecipient,
    hasNextPage: hasNextPageAsRecipient,
    fetchNextPage: fetchNextPageAsRecipient,
    isFetchingNextPage: isFetchingNextPageAsRecipient,
  }  = useGetInfiniteQuery(RESOURCES.MESSAGE, false, queryParamsAsRecipient);

  const queryParamsAsSender = `sender=Patient/${PATIENT_ID}`;
  const {
    data: dataAsSenderRaw,
    error: errorAsSender,
    isLoading: isLoadingAsSender,
    hasNextPage: hasNextPageAsSender,
    fetchNextPage: fetchNextPageAsSender,
    isFetchingNextPage: isFetchingNextPageAsSender,
  }  = useGetInfiniteQuery(RESOURCES.MESSAGE, false, queryParamsAsSender);

  const receivedMessages = (dataAsRecipientRaw?.pages || [])
    .map((page) => {
      const messagesRawData = page.entry || [];
      return messagesRawData.map(({ resource: entry }) => (
        {
          text: entry?.payload?.[0]?.contentString,
          date: new Date(entry?.sent || entry?.received),
          wasReceived: true,
        }
      ))
    })
    .reduce((acc, pageData) => acc.concat(pageData), []);

  const sentMessages = (dataAsSenderRaw?.pages || [])
    .map((page) => {
      const messagesRawData = page.entry || [];
      return messagesRawData.map(({ resource: entry }) => (
        {
          text: entry?.payload?.[0]?.contentString,
          date: new Date(entry?.sent || entry?.received),
          wasReceived: false,
        }
      ))
    })
    .reduce((acc, pageData) => acc.concat(pageData), []);

  const allMessages = receivedMessages.concat(sentMessages);
  allMessages.sort((a,b) => a.date > b.date ? -1 : 1);

  const fetchNextPage = () => {
    if (hasNextPageAsRecipient) {
      fetchNextPageAsRecipient()
    }
    if (hasNextPageAsSender) {
      fetchNextPageAsSender();
    }
  }

  // TODO format and return; make sure sorted by time

  return {
    data: allMessages,
    error: errorAsRecipient || errorAsSender,
    isLoading: isLoadingAsRecipient || isLoadingAsSender,
    hasNextPage: hasNextPageAsRecipient || hasNextPageAsSender,
    fetchNextPage,
    isFetchingNextPage: isFetchingNextPageAsRecipient || isFetchingNextPageAsSender,
  }
};
