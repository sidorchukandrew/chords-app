import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import Container from '../components/Container';
import LoadingIndicator from '../components/LoadingIndicator';
import NotificationSetting from '../components/NotificationSetting';
import SettingsApi from '../api/settingsApi';
import {reportError} from '../utils/error';
import {useTheme} from '../hooks/useTheme';

export default function NotificationSettingsScreen() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(false);
  const {surface} = useTheme();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let {data} = await SettingsApi.getNotificationSettings();
        setSettings(data);
      } catch (error) {
        reportError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function getEventReminderSettings() {
    return (
      settings.find(
        setting => setting.notification_type === 'Event reminder',
      ) || {}
    );
  }

  function handleChange(updatedSetting) {
    setSettings(currentSettings => {
      return currentSettings.map(setting =>
        setting.id === updatedSetting.id ? updatedSetting : setting,
      );
    });
  }

  return (
    <ScrollView style={[styles.screen, surface.primary]}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <Container padded>
          <NotificationSetting
            category="Event reminders"
            setting={getEventReminderSettings()}
            onChange={handleChange}
          />
        </Container>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 10,
  },
});
