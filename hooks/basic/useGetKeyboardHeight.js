import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export const useKeyboard = () => {
  const defaultHeight = 0;
  const [height, setHeight] = useState(defaultHeight);

  useEffect(() => {
    const shownListener = Keyboard.addListener(
      'keyboardDidShow',
        e => setHeight(e.endCoordinates.height)
    );
    const hiddenListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setHeight(defaultHeight)
    );
    return () => {
      shownListener.remove();
      hiddenListener.remove();
    };
  }, []);

  return height;
}
