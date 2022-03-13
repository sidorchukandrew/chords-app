import {ScrollView, StyleSheet, Text, View} from 'react-native';

import AccentButton from '../components/AccentButton';
import Container from './Container';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import SongContent from '../components/SongContent';

export default function SongContentTab({song, onPerform, onEdit}) {
  return (
    <ScrollView>
      <Container>
        <View style={styles.shortcutsContainer}>
          <AccentButton
            style={{marginRight: 5}}
            full
            onPress={onEdit}
            icon={
              <Icon
                name="pencil"
                size={20}
                style={styles.shortcutIcon}
                color="#2464eb"
              />
            }>
            Edit lyrics
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
        <View style={styles.content}>
          {song.content ? (
            <SongContent
              song={{
                ...song,
                show_transposed: !!song.transposed_key,
                show_capo: !!song.capo,
              }}
            />
          ) : (
            <Text>No lyrics have been added yet</Text>
          )}
        </View>
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  shortcutsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    marginTop: 10,
  },
  shortcutIcon: {
    marginRight: 8,
  },
  content: {
    marginVertical: 10,
    color: 'black',
  },
});
