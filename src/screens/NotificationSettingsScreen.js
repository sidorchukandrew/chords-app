import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';

import Container from '../components/Container';
import LoadingIndicator from '../components/LoadingIndicator';
import NotificationSetting from '../components/NotificationSetting';
import SettingsApi from '../api/settingsApi';
import {reportError} from '../utils/error';
import Divider from '../components/Divider';

export default function NotificationSettingsScreen() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let {data} = await SettingsApi.getNotificationSettings();
        console.log(data);
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

  if (loading) return <LoadingIndicator />;

  return (
    <ScrollView style={styles.screen}>
      <Container padded>
        <NotificationSetting
          category="Event reminders"
          setting={getEventReminderSettings()}
          onChange={handleChange}
        />
      </Container>
      <Container padded={false}>
        <Divider />
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    paddingTop: 10,
  },
});
