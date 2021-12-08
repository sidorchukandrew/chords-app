import React from 'react';
import {
  Modal as CoreModal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Modal({
  visible,
  onClose,
  options = {showCloseButton: false},
  children,
  style: providedStyles,
  position = 'center',
}) {
  return (
    <GestureRecognizer onSwipeDown={onClose}>
      <CoreModal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
        onDismiss={onClose}>
        <View style={[styles.centeredView, flexPositions[position]]}>
          <View style={[styles.modalView, providedStyles]}>
            <View style={styles.header}>
              <Text> </Text>
              {options.showCloseButton && (
                <Pressable onPress={onClose} style={styles.closeButton}>
                  <Icon name="close" size={20} color="#374251" />
                </Pressable>
              )}
            </View>
            {children}
          </View>
        </View>
      </CoreModal>
    </GestureRecognizer>
  );
}

const flexPositions = {
  bottom: {justifyContent: 'flex-end', paddingBottom: 20},
  center: {justifyContent: 'center'},
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, .25)',
  },
  modalView: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    padding: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
