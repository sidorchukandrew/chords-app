import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AccentButton from '../components/AccentButton';
import Container from './Container';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {format} from '../utils/date';

export default function SetlistDetailHeader({setlist, onNavigateTo}) {
  return (
    <View style={styles.container}>
      <View style={styles.dateTitleContainer}>
        <Text style={styles.title}>{setlist?.name}</Text>
        <View style={styles.dateContainer}>
          <Icon name="calendar-blank" size={18} color="#505050" />
          <Text style={styles.dateText}>
            {setlist.scheduled_date
              ? format(setlist.scheduled_date, 'ddd MMM D')
              : 'Not scheduled'}
          </Text>
        </View>
      </View>
      {setlist.songs?.length > 0 && (
        <Container size="sm">
          <AccentButton
            style={styles.button}
            onPress={() => onNavigateTo('Perform Setlist')}
            icon={
              <Icon
                name="play-circle"
                size={18}
                color="#2464eb"
                style={styles.playIcon}
              />
            }>
            Perform
          </AccentButton>
        </Container>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 10,
  },
  dateTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    paddingLeft: 10,
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dateText: {
    marginLeft: 5,
    color: '#505050',
    fontSize: 13,
  },
  playIcon: {
    marginRight: 8,
  },
});
