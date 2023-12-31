import {useState} from "react";
import {LANGUAGES_SUPPORTED} from "../../utils/constants";
import {IndexPath} from "@ui-kitten/components";
import { useTranslation } from 'react-i18next';
import Button from "../../componentLibrary/Button";
import Modal from "../../componentLibrary/Modal";

const LanguagePickerModal = ({onClose}) => {
  const { i18n } = useTranslation();
  const languages = Object.keys(LANGUAGES_SUPPORTED);
  const [languageForDisplay, setLanguageForDisplay] = useState(LANGUAGES_SUPPORTED.ENGLISH.DISPLAY);
  const [languageSelectedIndex, setLanguageSelectedIndex] = useState(new IndexPath(0));

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    onClose();
  }

  return (
    <Modal
      title='Language Picker'
      scrollView={true}
      onClose={onClose}
    >
      {Object.values(LANGUAGES_SUPPORTED).map(lg => (
        <Button
          key={lg.CODE}
          type='outline'
          isSecondary={true}
          text={lg.DISPLAY}
          onPress={() => changeLanguage(lg.CODE)}
        />
      ))}
    </Modal>
  )
}

export default LanguagePickerModal;
