import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import CircleButton from './CircleButton';
import useSessionConnection from '../hooks/useSessionConnection';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../hooks/useTheme';
import Blink from './Blink';
import SessionShortcutBottomSheet from './SessionShortcutBottomSheet';

export default function ConnectedSessionIndicator({showingSetlistNavigation}) {
  const {isMemberOfActiveSession, isHost} = useSessionConnection();
  const [shortcutSheetVisible, setShortcutSheetVisible] = useState(false);
  const {red, blue} = useTheme();

  function calculateBottomOffset() {
    let offset = 30;

    if (showingSetlistNavigation) offset += 50;
    return offset;
  }

  return (
    (isMemberOfActiveSession || isHost) && (
      <>
        <Blink duration={2000}>
          <CircleButton
            onPress={() => setShortcutSheetVisible(true)}
            style={[
              styles.button,
              isHost && red.background,
              isMemberOfActiveSession && blue.background,
              {bottom: calculateBottomOffset()},
            ]}>
            <MaterialIcon
              name="connect-without-contact"
              size={22}
              color="white"
            />
          </CircleButton>
        </Blink>
        <SessionShortcutBottomSheet
          visible={shortcutSheetVisible}
          onDismiss={setShortcutSheetVisible}
        />
      </>
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
