import {StyleSheet} from 'react-native';
import React from 'react';
import CircleButton from './CircleButton';
import useSessionConnection from '../hooks/useSessionConnection';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../hooks/useTheme';
import Blink from './Blink';

export default function ActiveSessionIndicator({showingSetlistNavigation}) {
  const {isMemberOfActiveSession} = useSessionConnection();
  const {red} = useTheme();

  function calculateBottomOffset() {
    let offset = 30;

    if (showingSetlistNavigation) offset += 50;
    return offset;
  }

  return (
    isMemberOfActiveSession && (
      <Blink duration={2000}>
        <CircleButton
          style={[
            styles.button,
            red.background,
            {bottom: calculateBottomOffset()},
          ]}>
          <MaterialIcon
            name="connect-without-contact"
            size={22}
            color="white"
          />
        </CircleButton>
      </Blink>
    )
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 16,
    padding: 8,
  },
});
