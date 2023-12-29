import React from "react";
import {PATIENT_ID, RESOURCES} from "../../utils/constants";
import {useGetQuery} from "../basic/useGetQuery";

export const useGetPatient = () => {
  const {data, isLoading, error} = useGetQuery(RESOURCES.PATIENT, true, PATIENT_ID)
  let name, addresses, demographics, photo;  // TODO phone number?

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
    demographics = {
      gender: data.gender,
      birthDate: data.birthDate,
      language: data?.["communication"]?.[0]?.["language"]?.["text"]
    };
    photo = data?.["photo"]?.[0]?.["url"];
  }

  return { name, addresses, demographics, photo, isPatientLoading: isLoading, patientError: error }
}
