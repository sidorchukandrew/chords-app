import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COMMON_METERS} from '../utils/music';
import BottomSheetModal from './BottomSheetModal';
import ConfirmCancelButtons from './ConfirmCancelButtons';
import MeterOption from './MeterOption';

export default function MeterModal({visible, onClose, meter, onChange}) {
  const [localMeter, setLocalMeter] = useState(meter || '4/4');
  const sheetRef = useRef();

  useEffect(() => {
    setLocalMeter(meter || '4/4');
  }, [meter]);

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  function breakApartMeter() {
    let parts = localMeter.split('/');
    return {top: parts[0], bottom: parts[1]};
  }

  function handleConfirm() {
    onChange?.(localMeter);
    sheetRef.current?.dismiss();
    onClose();
  }

  function handleCancel() {
    sheetRef.current?.dismiss();
    onClose();
  }

  return (
    <BottomSheetModal
      style={styles.modal}
      visible={visible}
      onDismiss={onClose}
      ref={sheetRef}>
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
      <ConfirmCancelButtons onCancel={handleCancel} onConfirm={handleConfirm} />
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  // modal: {
  //   width: 500,
  //   padding: 20,
  // },
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
