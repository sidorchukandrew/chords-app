import {StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons';
import React from 'react';
import Toggle from './Toggle';
import SettingsApi from '../api/settingsApi';
import {reportError} from '../utils/error';

export default function NotificationSetting({category, setting, onChange}) {
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
        <View style={styles.type}>
          <Text style={styles.typeText}>Email</Text>
          <Toggle
            enabled={setting.email_enabled}
            onChange={newValue =>
              handleUpdateSetting('email_enabled', newValue)
            }
          />
        </View>
        <View style={[styles.type, {borderBottomWidth: 0}]}>
          <Text style={styles.typeText}>Text message</Text>
          <Toggle
            enabled={setting.sms_enabled}
            onChange={newValue => handleUpdateSetting('sms_enabled', newValue)}
          />
        </View>
        {/* <View style={[styles.type, {borderBottomWidth: 0}]}>
          <Text style={styles.typeText}>Push</Text>
          <Toggle
            enabled={setting.app_enabled}
            onChange={newValue => handleUpdateSetting('app_enabled', newValue)}
          />
        </View> */}
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
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
  },
  typeText: {
    color: 'black',
    fontSize: 15,
  },
});
