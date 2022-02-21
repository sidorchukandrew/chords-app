import {Keyboard, View} from 'react-native';
import React, {useEffect, useState} from 'react';

export default function CustomKeyboardAvoidingView({children}) {
  const [keyboardHeight, setKeyboardHeight] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return <View style={{marginBottom: keyboardHeight + 50}}>{children}</View>;
}
