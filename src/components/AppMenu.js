import React from 'react';
import Modal from './Modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import RectButton from './RectButton';
import {Text, StyleSheet} from 'react-native';

export default function AppMenu({visible, onClose, onNavigateTo}) {
  return (
    <Modal visible={visible} onClose={onClose} style={styles.modal}>
      <RectButton
        styles={styles.button}
        onPress={() => onNavigateTo('Dashboard')}>
        <Icon name="view-dashboard" size={20} style={styles.icon} />
        <Text style={styles.text}>Dashboard</Text>
      </RectButton>

      <RectButton
        styles={styles.button}
        onPress={() => onNavigateTo('Binders')}>
        <Icon name="folder-music" size={20} style={styles.icon} />
        <Text style={styles.text}>Binders</Text>
      </RectButton>

      <RectButton styles={styles.button} onPress={() => onNavigateTo('Songs')}>
        <IonIcon name="musical-notes" size={20} style={styles.icon} />
        <Text style={styles.text}>Songs</Text>
      </RectButton>

      <RectButton styles={styles.button} onPress={() => onNavigateTo('Sets')}>
        <Icon name="playlist-music" size={20} style={styles.icon} />
        <Text style={styles.text}>Sets</Text>
      </RectButton>
      <RectButton
        styles={styles.button}
        onPress={() => onNavigateTo('Members')}>
        <Icon name="account-group" size={20} style={styles.icon} />
        <Text style={styles.text}>Team members</Text>
      </RectButton>

      <RectButton styles={styles.button}>
        <Icon name="swap-horizontal" size={20} style={styles.icon} />
        <Text style={styles.text}>Switch teams</Text>
      </RectButton>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: 450,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 20,
    color: '#374251',
  },
  text: {
    fontSize: 16,
    color: '#374251',
    fontWeight: '500',
  },
});
