import React, {useRef} from 'react';
import {View} from 'react-native';
import {TextField} from 'rn-material-ui-textfield';
import {useTheme} from '../hooks/useTheme';

export default function FormField({
  label,
  value,
  onChange,
  keyboardType = 'default',
  onPress,
  clearable,
  ...remainingProps
}) {
  const inputRef = useRef();
  const {icon} = useTheme();

  function handleFocus() {
    onPress?.();
    inputRef.current?.blur();
  }

  return (
    <View>
      <TextField
        ref={inputRef}
        label={label}
        value={value}
        baseColor={icon.secondary}
        textColor={icon.primary}
        onChangeText={onChange}
        fontSize={16}
        keyboardType={keyboardType}
        keyboardAppearance="dark"
        tintColor={icon.blue}
        onFocus={onPress && handleFocus}
        showSoftInputOnFocus={!onPress}
        {...remainingProps}
      />
    </View>
  );
}
