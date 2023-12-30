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
      <Button
        type='outline'
        isSecondary={true}
        text='English'
        onPress={() => changeLanguage('en')}
      />
      <Button
        type='outline'
        isSecondary={true}
        text='Español'
        onPress={() => changeLanguage('sp')}
      />
    </Modal>
  )
}

export default LanguagePickerModal;
