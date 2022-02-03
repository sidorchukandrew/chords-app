import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default function SearchInput({placeholder = 'Search', value, onChange}) {
  return (
    <View style={styles.container}>
      <Icon name="magnify" size={30} color="black" />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        style={styles.input}
        placeholderTextColor="#404040"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 15,
    marginLeft: 15,
    flex: 1,
    paddingVertical: 10,
  },
});
