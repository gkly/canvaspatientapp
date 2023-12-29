import React from "react";
import SectionCard from "../../componentLibrary/SectionCard";


const Consents = () => {
  // TODO implement
  const consentItems = [];

  return (
    <SectionCard
      iconName='folder-outline'
      title='Active Consents'
      contentItems={consentItems}
      // onLoadMore={onLoadMore}
    />
  )
}

export default Consents;
