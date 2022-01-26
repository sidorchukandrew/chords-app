import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PasswordRequirements({isLongEnough, isUncommon}) {
  const checkIcon = <Icon size={15} color="#059669" name="check-circle" />;

  const xIcon = <Icon size={15} color="#a0a0a0" name="close-circle-outline" />;

  return (
    <View style={styles.container}>
      <View style={styles.requirementContainer}>
        {isLongEnough ? checkIcon : xIcon}
        <Text style={styles.requirementText}>
          Must be at least 8 characters long
        </Text>
      </View>
      <View style={styles.requirementContainer}>
        {isUncommon ? checkIcon : xIcon}
        <Text style={styles.requirementText}>Must be uncommon</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  requirementContainer: {
    paddingBottom: 5,
    flexDirection: 'row',
  },
  requirementText: {
    color: '#404040',
    marginLeft: 7,
  },
});
