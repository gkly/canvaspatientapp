// months start at 0 so must add 1
export const formatDate = (date) => {
  if (date === undefined) {
    return '';
  }

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const monthString = (month < 10) ? `0${month}` : month;
  const dayString = (day < 10) ? `0${day}` : day;
  return `${date.getFullYear()}-${monthString}-${dayString}`;
}

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
          status: entry.achievementStatus?.coding?.[0]?.display,
          priority: entry.priority?.coding?.[0]?.display,
          dueDate: entry.target?.[0]?.dueDate,
        }
      ))
    })
    .reduce((acc, pageData) => acc.concat(pageData), []);
}

export const formatAllergiesData = (rawAllergiesAsPages= []) => {
  return rawAllergiesAsPages
    .map((page) => {
      const allergiesRawData = page.entry || [];
      return allergiesRawData.map(({ resource: entry }) => entry?.code?.text)
    })
    .reduce((acc, pageData) => acc.concat(pageData), []);
}

export const formatConditionsData = (rawConditionsAsPages= []) => {
  return rawConditionsAsPages
    .map((page) => {
      const allergiesRawData = page.entry || [];
      return allergiesRawData.map(({ resource: entry }) => entry?.code?.text)
    })
    .reduce((acc, pageData) => acc.concat(pageData), []);
}


