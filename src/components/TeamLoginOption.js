import {StyleSheet, Text, View} from 'react-native';

import ProfilePicture from './ProfilePicture';
import React from 'react';
import Tag from './Tag';
import {TouchableOpacity} from 'react-native';

export default function TeamLoginOption({team, bordered, onPress, selected}) {
  return (
    <View style={bordered && styles.border}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.buttonLeftContainer}>
          <ProfilePicture url={team.image_url} size="md" />
          <Text style={styles.buttonText}>{team.name}</Text>
        </View>

        {selected && <Tag tag="Current" />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10,
  },
  border: {
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
  },
  buttonLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
