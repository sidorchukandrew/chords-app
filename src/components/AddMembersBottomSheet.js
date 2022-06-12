import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import BottomSheet from './BottomSheet';
import RectButton from './RectButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../hooks/useTheme';

export default function AddMembersBottomSheet({
  visible,
  onDismiss,
  onInviteByEmail,
}) {
  const sheetRef = useRef();
  const {text} = useTheme();

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible]);

  function handleInviteByEmail() {
    onDismiss();
    sheetRef.current?.dismiss();
    onInviteByEmail();
  }

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={['CONTENT_HEIGHT']}
      dynamicHeight
      onDismiss={onDismiss}>
      <View style={styles.container}>
        <RectButton styles={styles.button} onPress={handleInviteByEmail}>
          <Icon name="email-outline" size={18} color={text.secondary.color} />
          <Text style={[styles.buttonText, text.secondary]}>
            Invite by email
          </Text>
        </RectButton>

        {/* <RectButton styles={styles.button} onPress={handleInviteByEmail}>
          <Icon name="export-variant" size={18} color="#505050" />
          <Text style={styles.buttonText}>Invite through public link</Text>
        </RectButton> */}
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#505050',
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 16,
  },
});
