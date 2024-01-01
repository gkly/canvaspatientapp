import {Linking} from "react-native";
import {ERROR_MESSAGES} from "./constants";

export const isTextEmpty = (text) => text === undefined || !text.trim();

export const parseIdFromResourcePath = (resourcePath) => resourcePath?.split('/')[1];

export const loadInBrowser = (url) => {
  Linking.openURL(url)
    .catch(() => Toast.show(ERROR_MESSAGES.OPEN_LINK));
}
