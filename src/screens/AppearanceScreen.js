import {StyleSheet, View} from 'react-native';
import {
  selectCurrentTheme,
  selectDisableSwipeInSetlist,
  selectShowSetlistNavigation,
  setDisableSwipeInSetlist,
  setShowSetlistNavigation,
  setTheme,
} from '../redux/slices/appearanceSlice';
import {useDispatch, useSelector} from 'react-redux';
import Divider from '../components/Divider';

import Container from '../components/Container';
import React from 'react';
import ToggleField from '../components/ToggleField';
import {useTheme} from '../hooks/useTheme';
import {ScrollView} from 'react-native-gesture-handler';

export default function AppearanceScreen() {
  const currentTheme = useSelector(selectCurrentTheme);
  const {surface, border} = useTheme();
  const showSetlistNavigation = useSelector(selectShowSetlistNavigation);
  const disableSwipeInSetlist = useSelector(selectDisableSwipeInSetlist);
  const dispatch = useDispatch();

  function handleToggleTheme(isDarkTheme) {
    dispatch(setTheme(isDarkTheme ? 'dark' : 'light'));
  }

  function handleToggleShowSetlistNavigation(shouldShow) {
    if (!shouldShow) {
      dispatch(setDisableSwipeInSetlist(false));
    }

    dispatch(setShowSetlistNavigation(shouldShow));
  }

  function handleToggleDisableSwipeInSetlist(canSwipe) {
    dispatch(setDisableSwipeInSetlist(canSwipe));
  }

  function isDark() {
    return currentTheme === 'dark';
  }

  return (
    <ScrollView style={[styles.screen, surface.primary]}>
      <Container size="md">
        <ToggleField
          label="Dark theme"
          style={styles.field}
          value={isDark()}
          onChange={handleToggleTheme}
        />
        <Divider />
        <ToggleField
          value={showSetlistNavigation}
          label="Show setlist bottom navigation"
          onChange={handleToggleShowSetlistNavigation}
          style={[styles.field, styles.underline, border.primary]}
        />

        <ToggleField
          value={disableSwipeInSetlist}
          label="Disable swiping between songs when performing set"
          onChange={handleToggleDisableSwipeInSetlist}
          style={styles.field}
          disabled={!showSetlistNavigation}
        />
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
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
  field: {
    paddingVertical: 10,
  },
  underline: {
    borderBottomWidth: 1,
  },
});
