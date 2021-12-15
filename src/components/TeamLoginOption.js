import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import ProfilePicture from './ProfilePicture';

export default function TeamLoginOption({team, bordered, onPress}) {
  return (
    <View style={bordered && styles.border}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <ProfilePicture url={team.image_url} size="md" />
        <Text style={styles.buttonText}>{team.name}</Text>
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
});
