import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import ProfilePicture from '../components/ProfilePicture';
import React from 'react';
import Tag from './Tag';
import {getNameOrEmail} from '../utils/member';

export default function MembersListRow({member, onPress, me}) {
  return (
    <TouchableOpacity style={styles.row} disabled>
      <View style={styles.avatar}>
        <ProfilePicture url={member?.image_url} size="lg" member={member} />
      </View>
      <View>
        <Text style={styles.name}>{getNameOrEmail(member)}</Text>
        {me && (
          <View style={{flexDirection: 'row'}}>
            <Tag tag="Me" />
            <View />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  name: {
    fontWeight: '500',
    fontSize: 16,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  avatar: {
    paddingRight: 15,
  },
});
