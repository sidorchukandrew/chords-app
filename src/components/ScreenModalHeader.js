import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingIndicator from './LoadingIndicator';
import React from 'react';
import {useTheme} from '../hooks/useTheme';

export default function ScreenModalHeader({
  title,
  onBackPress,
  onSavePress,
  saveDisabled,
  options = {saveVisible: false, backVisible: false},
  saving = false,
}) {
  const {border, surface, text, icon, blue, isDark} = useTheme();

  const saveButton = saving ? (
    <View style={styles.saveButtonContainer}>
      <LoadingIndicator />
    </View>
  ) : (
    <View style={styles.saveButtonContainer}>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={onSavePress}
        disabled={saveDisabled}>
        <Text
          style={[
            styles.saveButtonText,
            blue.text,
            saveDisabled && text.disabled,
          ]}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View
      style={[
        styles.header,
        isDark ? surface.secondary : surface.primary,
        border.primary,
      ]}>
      <View style={styles.container}>
        {options.backVisible ? (
          <View style={styles.backButtonContainer}>
            <TouchableOpacity onPress={onBackPress} style={[styles.backButton]}>
              <Text>
                <Icon name="close" color={icon.secondary} size={22} />
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.backButton} />
        )}
        <Text style={[styles.headerTitle, styles.grow, text.primary]}>
          {title}
        </Text>
        {options.saveVisible ? (
          saveButton
        ) : (
          <View style={styles.saveButtonContainer} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '500',
    fontSize: 17,
  },
  backButton: {
    width: 30,
    padding: 5,
  },
  backButtonContainer: {
    flex: 1,
  },
  saveButton: {
    width: 40,
    alignItems: 'flex-end',
  },
  saveButtonContainer: {
    alignItems: 'flex-end',
    flex: 1,
  },
  saveButtonText: {
    fontWeight: '600',
    fontSize: 17,
  },
});
