import React from "react";
import {PATIENT_ID, RESOURCES} from "../../utils/constants";
import {useGetQuery} from "../basic/useGetQuery";
import Toast from "react-native-simple-toast";

export const useGetPatient = () => {
  const {data, isLoading, error} = useGetQuery(RESOURCES.PATIENT, true, PATIENT_ID)
  let name, addresses, language, demographics, photo;  // TODO phone number?

  if (!isLoading && !error && data) {
    let firstNamePreferred, firstNameLegal, lastNameLegal;
    const nameRawData = data.name || [];
    nameRawData.forEach((entry) => {
      if (entry.use === 'official') {
        firstNameLegal = entry["given"][0];
        lastNameLegal = entry["family"];
      }
      if (entry.use === 'nickname') {
        firstNamePreferred = entry["given"][0]
      }
    })

    name = {firstNamePreferred, firstNameLegal, lastNameLegal};
    addresses = data.address || [];
    const languageRawData = data?.["communication"]?.[0]?.["language"].coding[0];
    language = {
      display: languageRawData.display,
      code: languageRawData.code,
    }
    demographics = {
      gender: data.gender,
      birthDate: data.birthDate,
    };
    photo = data?.["photo"]?.[0]?.["url"];
  }

  return { name, addresses, language, demographics, photo, isPatientLoading: isLoading, patientError: error }
}
