import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Input from '../components/Input';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  return (
    <View>
      <Input
        placeholder="Search your library"
        value={query}
        onChange={setQuery}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
