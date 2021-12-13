import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ScreenModalHeader from '../components/ScreenModalHeader';
import ScreenModal from './ScreenModal';

export default function EditSongDetailsModal({navigation}) {
  return (
    <ScreenModal>
      <ScreenModalHeader
        options={{saveVisible: true, backVisible: true}}
        title="Edit Song"
        onBackPress={navigation.goBack}
        onSavePress={navigation.goBack}
      />
    </ScreenModal>
  );
}

const styles = StyleSheet.create({});
