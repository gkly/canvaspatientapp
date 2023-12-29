import {useGetInfiniteQuery} from "../basic/useGetInfiniteQuery";
import {RESOURCES} from "../../utils/constants";
import {getRequestBatch, getUrlForResource} from "../../utils/network_request_helpers";
import {parseIdFromResourcePath} from "../../utils/helpers";
import {useEffect, useState} from "react";

export const useGetObservationValues = (observationsCoding, observationIds) => {
  const [observationResultsMapping, setObservationResultsMapping] = useState({});

  const observationsCodingMapping = (observationsCoding || [])
    .reduce((acc, obs) => {
      acc[obs.code] = obs;
      return acc
    }, {});

  useEffect(() => {
    const observationResultsMapping = {};
    const getObservationValues = async () => {
      const allRequestUrls = observationIds
        .map(id => getUrlForResource(RESOURCES.OBSERVATION, id));
      const allObservations = await getRequestBatch(allRequestUrls);
      allObservations.forEach(obs => {
        const code = obs?.code?.coding[0]?.code;
        const valueQuantity = obs?.valueQuantity;
        observationResultsMapping[code] = {
          criteria: observationsCodingMapping[code].display,
          value: valueQuantity.value,
          unit: valueQuantity.unit
        }
      })

      setObservationResultsMapping(observationResultsMapping);
    }

    getObservationValues();
  }, [observationIds]);

  return {
    observationResultsMapping,
    // TODO
    // error,
    // isLoading,
  }
}