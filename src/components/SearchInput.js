import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../hooks/useTheme';
export default function SearchInput({placeholder = 'Search', value, onChange}) {
  const {text, icon} = useTheme();
  return (
    <View style={styles.container}>
      <Icon name="magnify" size={30} color={icon.secondary} />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        style={[styles.input, text.primary]}
        placeholderTextColor={text.secondary.color}
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
