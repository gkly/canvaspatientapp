import React from "react";
import SectionCard from "../../componentLibrary/SectionCard";


const Questionnaires = () => {
  // TODO implement
  const questionnaireItems = [];

  return (
    <SectionCard
      iconName='question-mark-outline'
      title='Questionnaires'
      contentItems={questionnaireItems}
      // onLoadMore={onLoadMore}
    />
  )
}

export default Questionnaires;
