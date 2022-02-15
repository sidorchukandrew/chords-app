import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AlertBubble({
  message,
  title = 'Something went wrong',
  dismissable,
  onDismiss,
  showTitle = true,
  style: providedStyles,
}) {
  return (
    <View style={[styles.bubbleContainer, providedStyles]}>
      <View styles={styles.textContainer}>
        {showTitle && <Text style={styles.titleText}>{title}</Text>}
        <Text style={styles.messageText}>{message}</Text>
      </View>
      {dismissable && (
        <View>
          <TouchableOpacity onPress={onDismiss}>
            <Icon name="close" size={18} color="#92400e" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bubbleContainer: {
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#fde68a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10,
    color: '#92400e',
  },
  messageText: {
    color: '#92400e',
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
});
