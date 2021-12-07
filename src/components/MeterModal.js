import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react/cjs/react.development';
import {COMMON_METERS} from '../utils/music';
import ConfirmCancelButtons from './ConfirmCancelButtons';
import MeterOption from './MeterOption';
import Modal from './Modal';

export default function MeterModal({visible, onClose, meter, onChange}) {
  const [localMeter, setLocalMeter] = useState(meter || '4/4');

  useEffect(() => {
    setLocalMeter(meter || '4/4');
  }, [meter]);

  function breakApartMeter() {
    let parts = localMeter.split('/');
    return {top: parts[0], bottom: parts[1]};
  }

  function handleConfirm() {
    onChange?.(localMeter);
    onClose();
  }
  return (
    <Modal style={styles.modal} visible={visible} onClose={onClose}>
      <Text style={styles.title}>Choose a meter</Text>
      <View style={styles.commonMetersContainer}>
        {COMMON_METERS.map((commonMeter, index) => (
          <MeterOption
            meter={commonMeter}
            key={index}
            onPress={setLocalMeter}
          />
        ))}
      </View>
      <View style={styles.selectedMeterContainer}>
        <Text style={styles.selectedMeterText}>{breakApartMeter().top}</Text>
        <Text style={styles.selectedMeterText}>{breakApartMeter().bottom}</Text>
      </View>
      <ConfirmCancelButtons onCancel={onClose} onConfirm={handleConfirm} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: 500,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 30,
  },
  commonMetersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  selectedMeterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  selectedMeterText: {
    fontSize: 40,
    fontWeight: '600',
  },
});
