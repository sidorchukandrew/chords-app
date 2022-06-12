import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '../hooks/useTheme';

export default function Button({
  children,
  onPress,
  style: providedStyles,
  full,
  disabled,
  loading,
}) {
  const {surface} = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        full && styles.full,
        disabled && surface.tertiary,
        providedStyles,
      ]}
      disabled={disabled || loading}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={[styles.buttonText, disabled && styles.disabledText]}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2464eb',
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },
  full: {
    flex: 1,
  },
  disabledText: {
    color: '#a0a0a0',
  },
});
