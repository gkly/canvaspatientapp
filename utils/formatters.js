// months start at 0 so must add 1
export const formatDate = (date) => (date === undefined) ? '' : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export const formatTime = (dateObj, withSuffix=true) => {
  const hour = dateObj.getHours();
  const hourAsString = (hour > 12) ? (hour - 12) : hour;
  const minutes = dateObj.getMinutes();
  const minutesAsString = (minutes === 0) ? '00' : minutes;
  const suffix = (hour < 12) ? 'AM' : 'PM';
  const suffixAsString = withSuffix ? suffix : '';
  return hourAsString + ':' + minutesAsString + suffixAsString;
}

export const formatTimeRange = (startDateObj, endDateObj, withSuffix=true) => {
  return formatTime(startDateObj, withSuffix) + ' - ' + formatTime(endDateObj, withSuffix);
}

export const formatReferenceResource = (resource, id) => `${resource}/${id}`;

export const formatGoalsData = (rawGoalsDataAsPages= []) => {
  return rawGoalsDataAsPages
    .map((page) => {
      const goalsRawData = page.entry || [];
      return goalsRawData.map(({ resource: entry }) => (
        {
          name: entry.description?.text,
          status: entry.achievementStatus?.coding[0]?.display,
          priority: entry.priority?.coding[0]?.display,
        }
      ))
    })
    .reduce((acc, pageData) => acc.concat(pageData), []);
}

export const formatAllergiesData = (rawAllergiesAsPages= []) => {
  return rawAllergiesAsPages
    .map((page, index) => {
      const allergiesRawData = page.entry || [];
      // TODO: low priority check which coding display should be used if this matters
      return allergiesRawData.map(({ resource: entry }) => entry["code"].text)
    })
    .reduce((acc, pageData) => acc.concat(pageData), []);
}

export const formatConditionsData = (rawConditionsAsPages= []) => {
  return rawConditionsAsPages
    .map((page, index) => {
      const allergiesRawData = page.entry || [];
      return allergiesRawData.map(({ resource: entry }) => entry.code?.text)
    })
    .reduce((acc, pageData) => acc.concat(pageData), []);
}


