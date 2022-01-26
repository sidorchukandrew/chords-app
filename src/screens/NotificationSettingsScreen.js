import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';

import Container from '../components/Container';
import LoadingIndicator from '../components/LoadingIndicator';
import NotificationSetting from '../components/NotificationSetting';
import SettingsApi from '../api/settingsApi';
import {reportError} from '../utils/error';

export default function NotificationSettingsScreen() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(false);

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

  if (loading) return <LoadingIndicator />;

  console.log(settings);
  return (
    <ScrollView style={styles.screen}>
      <Container>
        <NotificationSetting category="Event reminders" />
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
});
