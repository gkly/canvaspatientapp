import axios from "axios";
import * as SecureStore from "expo-secure-store";
import {Linking} from "react-native";
import {BASE_URL, PATIENT_ID, TOKEN} from "./constants";

// TODO move
export const loadInBrowser = (url) => {
  // TODO better error handling
  Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
};

export const getEndpoint = (resource, resourceId) => resourceId ? `/${resource}/${resourceId}` : `/${resource}`;

export const getUrlForResource = (resource, resourceId) => BASE_URL + getEndpoint(resource, resourceId);

export const getUrlForSearch = (resource, isPatientSpecific, additionalQueryParams='') => {
  const resourceEndpoint = getEndpoint(resource);
  const baseQueryParam = isPatientSpecific ? `?patient=${PATIENT_ID}` : '';
  const connector = isPatientSpecific ? '&' : '?';
  return BASE_URL + resourceEndpoint + baseQueryParam + connector + additionalQueryParams
}

export const fetchNewToken = async () => {
  const response = await axios.post(
    process.env.EXPO_PUBLIC_AUTH_API,
    {
      grant_type: 'client_credentials',
      client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
      client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
    },
    {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }
  )

  const token =  response?.data?.access_token;
  const valid_duration = response?.data?.expires_in * 1000; // convert from sec to ms
  const expires_in = valid_duration ? (Date.now() + valid_duration) : null;
  await Promise.all([
    SecureStore.setItemAsync('bearer_token',token),
    SecureStore.setItemAsync('expires_in', expires_in.toString())
  ]);
  return token
}

export const getToken = async () =>{
  let [storedToken, tokenExpiration] = await Promise.all([
    SecureStore.getItemAsync('bearer_token'),
    SecureStore.getItemAsync('expires_in')
  ]);

  if (storedToken && tokenExpiration > Date.now()) {
    return storedToken;
  } else {
    return fetchNewToken();
  }
}

export const getRequest = async (url) => {
  const token = await getToken();
  const response = await axios.get(
    url,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
  );

  return response?.data;
}

export const getRequestBatch = async (urls) => {
  const token = await getToken();
  const allData = await Promise.all(
    urls.map(url =>
      axios.get(
        url,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      ).then(response => {
        return response?.data
      })
    )
  )
  return allData;
}

export const postRequest = async (url, payload) => {
  const token = await getToken();
  const response = await axios.post(
    url,
    payload,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    }
  );

  return response?.data;
}
