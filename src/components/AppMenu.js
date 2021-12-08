import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import RectButton from './RectButton';
import {Text, StyleSheet, View} from 'react-native';
import Modal from './Modal';

export default function AppMenu({visible, onClose, onNavigateTo}) {
  return (
    <Modal
      visible={visible}
      onClose={onClose}
      style={styles.modal}
      position="bottom">
      <View style={styles.container}>
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

        <RectButton
          styles={styles.button}
          onPress={() => onNavigateTo('Songs')}>
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
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  dialog: {
    alignItems: 'center',
    marginBottom: 20,
  },
  container: {
    borderRadius: 12,
    backgroundColor: 'white',
    width: '100%',
    maxWidth: 450,
    padding: 10,
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
