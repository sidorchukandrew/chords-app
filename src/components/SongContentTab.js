import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AccentButton from '../components/AccentButton';
import Container from './Container';

export default function SongContentTab({song, onPerform}) {
  return (
    <Container>
      <View style={styles.shortcutsContainer}>
        <AccentButton
          style={{marginRight: 5}}
          full
          icon={
            <Icon
              name="pencil"
              size={20}
              style={styles.shortcutIcon}
              color="#2464eb"
            />
          }>
          Edit
        </AccentButton>
        <AccentButton
          style={{marginLeft: 5}}
          full
          onPress={onPerform}
          icon={
            <Icon
              name="play-circle"
              size={20}
              color="#2464eb"
              style={styles.shortcutIcon}
            />
          }>
          Perform
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
    marginBottom: 20,
  },
  shortcutIcon: {
    marginRight: 8,
  },
});
