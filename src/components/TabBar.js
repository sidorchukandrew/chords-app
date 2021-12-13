import React, {useState} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppMenu from './AppMenu';

export default function TabBar({state, descriptors, navigation}) {
  const [menuVisible, setMenuVisible] = useState(false);
  const shouldShowLabels = Dimensions.get('window').width > 500;

  function isFocused(routeIndex) {
    return state.index === routeIndex;
  }

  function handleNavigateTo(route) {
    navigation.navigate(route);
    setMenuVisible(false);
  }

  const searchColors = isFocused(1) ? styles.blue : styles.gray;
  const accountColors = isFocused(2) ? styles.blue : styles.gray;

  return (
    <>
      <View style={styles.bar}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Search')}>
          <Icon name="magnify" size={20} style={searchColors} />
          {shouldShowLabels && (
            <Text style={[searchColors, styles.buttonText]}>Search</Text>
          )}
        </Pressable>
        <Pressable style={styles.button} onPress={() => setMenuVisible(true)}>
          <Icon name="menu" size={20} style={styles.gray} />
          {shouldShowLabels && (
            <Text style={[styles.gray, styles.buttonText]}>Menu</Text>
          )}
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Account')}>
          <Icon name="account" size={20} style={accountColors} />
          {shouldShowLabels && (
            <Text style={[accountColors, styles.buttonText]}>Account</Text>
          )}
        </Pressable>
      </View>
      <AppMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onNavigateTo={handleNavigateTo}
      />
    </>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    paddingVertical: 4,
    borderTopColor: '#e0e0e0',
    borderTopWidth: 1,
    backgroundColor: 'white',
    height: 45,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontWeight: '500',
    marginLeft: 5,
  },
  gray: {
    color: '#505050',
  },
  blue: {
    color: '#1d4ed8',
  },
});
