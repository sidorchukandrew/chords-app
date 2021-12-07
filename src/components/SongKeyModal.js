import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useState} from 'react/cjs/react.development';
import {MAJOR_KEYS_WITH_SPACES, MINOR_KEYS_WITH_SPACES} from '../utils/music';
import AccentButton from './AccentButton';
import Button from './Button';
import ConfirmCancelButtons from './ConfirmCancelButtons';
import Modal from './Modal';
import SegmentedControl from './SegmentedControl';
import SongKeyOption from './SongKeyOption';

export default function SongKeyModal({onClose, visible, songKey, onChange}) {
  const [originalKey, setOriginalKey] = useState(songKey || 'G');
  const [quality, setQuality] = useState('Major');
  const [keyRows, setKeyRows] = useState(MAJOR_KEYS_WITH_SPACES);

  useEffect(() => {
    setOriginalKey(songKey || 'G');
  }, [songKey]);

  useEffect(() => {
    setKeyRows(
      quality === 'Major' ? MAJOR_KEYS_WITH_SPACES : MINOR_KEYS_WITH_SPACES,
    );
  }, [quality]);

  function handleConfirm() {
    onChange?.(originalKey);
    onClose();
  }

  return (
    <Modal visible={visible} onClose={onClose} style={styles.modal}>
      <Text style={styles.selectedKey}>{originalKey}</Text>
      <View style={styles.qualityPickerContainer}>
        <SegmentedControl
          options={['Major', 'Minor']}
          selected={quality}
          onPress={setQuality}
          style={styles.qualityPicker}
        />
      </View>
      {keyRows?.map((keyRow, index) => (
        <View key={index} style={styles.keyRow}>
          {keyRow.map((keyOption, innerIndex) => (
            <SongKeyOption
              songKey={keyOption}
              key={innerIndex}
              selected={keyOption === originalKey}
              onPress={setOriginalKey}
            />
          ))}
        </View>
      ))}
      <ConfirmCancelButtons onCancel={onClose} onConfirm={handleConfirm} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  selectedKey: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  modal: {
    maxWidth: 600,
    width: '100%',
    padding: 20,
    marginHorizontal: 10,
  },
  qualityPicker: {
    width: 200,
  },
  qualityPickerContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
});
