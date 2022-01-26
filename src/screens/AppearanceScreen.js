import {StyleSheet, Text, View} from 'react-native';
import {selectCurrentTheme, setTheme} from '../redux/slices/appearanceSlice';
import {useDispatch, useSelector} from 'react-redux';

import Container from '../components/Container';
import React from 'react';
import Toggle from '../components/Toggle';

export default function AppearanceScreen() {
  const currentTheme = useSelector(selectCurrentTheme);
  const dispatch = useDispatch();

  function handleToggleTheme(isDarkTheme) {
    dispatch(setTheme(isDarkTheme ? 'dark' : 'light'));
  }

  return (
    <View style={styles.screen}>
      <Container size="md">
        <View style={styles.row}>
          <Text style={styles.label}>Dark theme</Text>
          <Toggle
            enabled={currentTheme === 'dark'}
            onChange={handleToggleTheme}
          />
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    paddingVertical: 10,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
  },
});
