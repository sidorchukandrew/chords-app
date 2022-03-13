import {StyleSheet, View} from 'react-native';
import {
  selectCurrentTheme,
  selectShowSetlistNavigation,
  setShowSetlistNavigation,
  setTheme,
} from '../redux/slices/appearanceSlice';
import {useDispatch, useSelector} from 'react-redux';

import Container from '../components/Container';
import React from 'react';
import ToggleField from '../components/ToggleField';

export default function AppearanceScreen() {
  const currentTheme = useSelector(selectCurrentTheme);
  const showSetlistNavigation = useSelector(selectShowSetlistNavigation);
  const dispatch = useDispatch();

  function handleToggleTheme(isDarkTheme) {
    dispatch(setTheme(isDarkTheme ? 'dark' : 'light'));
  }

  function handleToggleShowSetlistNavigation(newValue) {
    dispatch(setShowSetlistNavigation(newValue));
  }

  return (
    <View style={styles.screen}>
      <Container size="md">
        <ToggleField
          enabled={showSetlistNavigation}
          label="Show setlist bottom navigation"
          onChange={handleToggleShowSetlistNavigation}
        />
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
