import {StyleSheet, Text, View} from 'react-native';

import ToggleField from '../components/ToggleField';
import React from 'react';
import Toggle from './Toggle';
import SettingsApi from '../api/settingsApi';
import {reportError} from '../utils/error';
import {useTheme} from '../hooks/useTheme';

export default function NotificationSetting({category, setting, onChange}) {
  const {border} = useTheme();

  async function handleUpdateSetting(type, enabled) {
    try {
      onChange({...setting, [type]: enabled});
      await SettingsApi.updateNotificationSetting(setting.id, {
        [type]: enabled,
      });
    } catch (error) {
      reportError(error);
    }
  }

  return (
    <View>
      <Text style={styles.categoryText}>{category}</Text>
      <View style={styles.typesContainer}>
        <View style={[styles.type, border.primary]}>
          <ToggleField
            style={styles.field}
            label="Email"
            value={setting.email_enabled}
            onChange={newValue =>
              handleUpdateSetting('email_enabled', newValue)
            }
          />
        </View>
        <View style={[styles.type, border.primary]}>
          <ToggleField
            style={styles.field}
            label="Text message"
            value={setting.sms_enabled}
            onChange={newValue => handleUpdateSetting('sms_enabled', newValue)}
          />
        </View>
        <View style={[styles.type, {borderBottomWidth: 0}]}>
          <ToggleField
            style={styles.field}
            label="App (Push)"
            value={setting.push_enabled}
            onChange={newValue => handleUpdateSetting('push_enabled', newValue)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
  },
  typesContainer: {
    paddingVertical: 10,
  },
  type: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  typeText: {
    color: 'black',
    fontSize: 15,
  },
  field: {
    width: '100%',
  },
});
