import React from "react";
import {PATIENT_ID, RESOURCES} from "../../utils/constants";
import {useGetQuery} from "../basic/useGetQuery";

export const useGetCareTeam = () => {
  const { data, error, isLoading }  = useGetQuery(RESOURCES.CARE_TEAM, true);

  const careTeam = (data?.entry || [])
    .map(({ resource: entry }) => ({
      name: entry.participant[0].member.display,
      role: entry.participant[0].role[0].coding[0].display,
    }));

  return { careTeam, isCareTeamLoading: isLoading, careTeamError: error }
}
