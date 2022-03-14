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

import Container from '../components/Container';
import React from 'react';
import ToggleField from '../components/ToggleField';

export default function AppearanceScreen() {
  const currentTheme = useSelector(selectCurrentTheme);
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

  return (
    <View style={styles.screen}>
      <Container size="md">
        <ToggleField
          value={showSetlistNavigation}
          label="Show setlist bottom navigation"
          onChange={handleToggleShowSetlistNavigation}
          style={[styles.field, styles.underline]}
        />

        <ToggleField
          value={disableSwipeInSetlist}
          label="Disable swiping between songs when performing set"
          onChange={handleToggleDisableSwipeInSetlist}
          style={styles.field}
          disabled={!showSetlistNavigation}
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
  field: {
    paddingVertical: 10,
  },
  underline: {
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
  },
});
