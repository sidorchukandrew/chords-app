import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Detail from './Detail';
import Divider from './Divider';
import Section from './Section';
import Tag from './Tag';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SongDetailsTab({song, onNavigateTo}) {
  return (
    <View>
      <Section
        title="Details"
        button={
          <TouchableOpacity onPress={() => onNavigateTo('Edit Song Details')}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        }>
        <Detail title="Original Key" data={song.original_key} border />
        <Detail title="Transposed" data={song.transposed_key} border />
        <Detail title="Artist" data={song.artist} border />
        <Detail title="BPM" data={song.bpm} border />
        <Detail title="Meter" data={song.meter} />
      </Section>
      <Divider size="lg" />
      <Section
        title="Themes"
        button={
          <TouchableOpacity onPress={() => onNavigateTo('Add Theme')}>
            <Icon color="#0969da" size={20} name="plus" />
          </TouchableOpacity>
        }>
        <ScrollView horizontal style={styles.listContainer}>
          {song.themes?.map(theme => (
            <Tag key={theme.id} tag={theme.name} style={styles.tag} />
          ))}
        </ScrollView>
      </Section>
      <Divider size="lg" />
      <Section
        title="Genres"
        button={
          <TouchableOpacity onPress={() => onNavigateTo('Add Genre')}>
            <Icon color="#0969da" size={20} name="plus" />
          </TouchableOpacity>
        }>
        <ScrollView horizontal style={styles.listContainer}>
          {song.genres?.map(genre => (
            <Tag key={genre.id} tag={genre.name} style={styles.tag} />
          ))}
        </ScrollView>
      </Section>
      <Divider size="lg" />
      <Section title="Binders">
        <ScrollView horizontal style={styles.listContainer}>
          {song.binders?.map(binder => (
            <Tag
              key={binder.id}
              tag={binder.name}
              style={styles.binderTag}
              textStyle={styles.binderTagText}
            />
          ))}
        </ScrollView>
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    marginRight: 10,
  },
  listContainer: {
    marginBottom: 10,
  },
  binderTag: {
    marginRight: 10,
    backgroundColor: '#0969da',
  },
  binderTagText: {
    color: 'white',
  },
  editButtonText: {
    color: '#0969da',
    fontWeight: '600',
  },
  addIcon: {},
});
