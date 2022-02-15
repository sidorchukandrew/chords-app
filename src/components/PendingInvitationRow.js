import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {format} from '../utils/date';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import InvitationOptionsBottomSheet from './InvitationOptionsBottomSheet';
import {useSelector} from 'react-redux';
import {selectCurrentMember} from '../redux/slices/authSlice';
import {ADD_MEMBERS} from '../utils/auth';

export default function PendingInvitationRow({
  invitation,
  onDeleted,
  onResent,
}) {
  const [optionsSheetVisible, setOptionsSheetVisible] = useState(false);
  const currentMember = useSelector(selectCurrentMember);

  return (
    <>
      <TouchableOpacity
        style={styles.row}
        disabled={!currentMember.can(ADD_MEMBERS)}
        onPress={() => setOptionsSheetVisible(true)}>
        <View>
          <Text style={styles.emailText}>{invitation.email}</Text>
          <Text>Sent {format(invitation.updated_at, 'ddd MMM D')}</Text>
        </View>
        <Icon name="dots-horizontal" size={18} color="#505050" />
      </TouchableOpacity>
      <InvitationOptionsBottomSheet
        visible={optionsSheetVisible}
        onDismiss={() => setOptionsSheetVisible(false)}
        invitation={invitation}
        onDeleted={onDeleted}
        onResent={onResent}
      />
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emailText: {
    fontWeight: '500',
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
});
