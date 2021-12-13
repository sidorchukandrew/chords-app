import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AccentButton from '../components/AccentButton';
import Container from './Container';

export default function SongContentTab({song, onPerform}) {
  return (
    <Container>
      <View style={styles.shortcutsContainer}>
        <AccentButton style={{marginRight: 5}} full>
          <View style={styles.shortcut}>
            <Icon name="pencil" size={20} style={styles.shortcutIcon} />
            <Text style={styles.shortcutText}>Edit</Text>
          </View>
        </AccentButton>
        <AccentButton style={{marginLeft: 5}} full onPress={onPerform}>
          <View style={styles.shortcut}>
            <Icon name="play-circle" size={20} style={styles.shortcutIcon} />
            <Text style={styles.shortcutText}>Perform</Text>
          </View>
        </AccentButton>
      </View>
      <Text>{song.content}</Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  shortcutsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  shortcut: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  shortcutIcon: {
    color: '#2464eb',
    marginRight: 8,
  },
  shortcutText: {
    color: '#2464eb',
    fontWeight: '700',
    fontSize: 15,
  },
});
