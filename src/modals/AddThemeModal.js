import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ScreenModalHeader from '../components/ScreenModalHeader';
import ScreenModal from './ScreenModal';

export default function AddThemeModal({navigation}) {
  return (
    <ScreenModal>
      <ScreenModalHeader
        options={{saveVisible: true, backVisible: true}}
        title="Add Theme"
        onBackPress={navigation.goBack}
        onSavePress={navigation.goBack}
      />
    </ScreenModal>
  );
}

const styles = StyleSheet.create({});
