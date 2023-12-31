import {useTranslation} from "react-i18next";
import Button from "./Button";


const LoadMoreButton = ({isLoading, onPress}) => {
  const { t } = useTranslation();
  const buttonText = isLoading ? `${t('button-loading')}...` : t('button-loadmore');

  return (
    <Button
      text={buttonText}
      onPress={onPress}
      iconName='arrow-circle-down-outline'
      type='ghost'
      disabled={isLoading}
    />
  )
}

export default LoadMoreButton;

