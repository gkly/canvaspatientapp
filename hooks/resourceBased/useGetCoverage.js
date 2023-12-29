import {CONSENT_CODE, RESOURCES} from "../../utils/constants";
import {useGetQuery} from "../basic/useGetQuery";

export const useGetCoverage = () => {
  const {data, isLoading, error} = useGetQuery(RESOURCES.COVERAGE, true);

  const insurances = (data?.entry || [])
    .filter(({ resource: entry }) => entry.status === 'active')
    .map(({ resource: entry }) => {
      const coverageDetails = (entry.class || [])
        .reduce((acc, c) => {
          acc[c.type.coding[0].code] = c.value
          return acc;
        }, {});

      return {
        payerName: entry.payor[0].display,
        subscriberId: entry.subscriberId,
        coverageGroup: coverageDetails['group'],
        coveragePlan: coverageDetails['plan'],
      }
    })

  return { insurances, isCoverageLoading: isLoading, coverageError: error };
}
