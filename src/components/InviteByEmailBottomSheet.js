import {StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BottomSheet from './BottomSheet';
import FormField from './FormField';
import Button from './Button';
import AlertBubble from './AlertBubble';
import {reportError} from '../utils/error';
import InvitationsApi from '../api/invitationsApi';

export default function InviteByEmailBottomSheet({
  pendingInvitations,
  members,
  visible,
  onDismiss,
  onInvitationSent,
}) {
  const sheetRef = useRef();
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  function isAlreadyInvited() {
    const lowercasedEmail = email.toLowerCase();

    let combined = pendingInvitations.concat(members);

    return !!combined.find(
      inviteOrMember => inviteOrMember.email?.toLowerCase() === lowercasedEmail,
    );
  }

  async function handleSendInvite() {
    try {
      setSaving(true);
      const {data} = await InvitationsApi.createOne({email});

      clearState();
      onDismiss();
      sheetRef.current?.dismiss();
      onInvitationSent(data);
    } catch (error) {
      setSaving(false);
      reportError(error, {showError: true});
    }
  }

  function clearState() {
    setEmail('');
    setSaving(false);
  }

  return (
    <BottomSheet
      ref={sheetRef}
      onDismiss={onDismiss}
      dynamicHeight
      snapPoints={['CONTENT_HEIGHT']}>
      <View style={styles.container}>
        <FormField
          label="Email"
          value={email}
          onChange={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
        <Button
          style={styles.inviteButton}
          loading={saving}
          onPress={handleSendInvite}
          disabled={isAlreadyInvited() || !email}>
          Invite
        </Button>
        {isAlreadyInvited() && (
          <AlertBubble
            style={styles.alert}
            showTitle={false}
            message="Someone with that email is already on this team"
          />
        )}
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  inviteButton: {
    marginTop: 10,
  },
  alert: {
    marginTop: 15,
  },
});
