import React, {useRef} from 'react';
import {View} from 'react-native';
import {TextField} from 'rn-material-ui-textfield';

export default function FormField({
  label,
  value,
  onChange,
  keyboardType = 'default',
  onPress,
  ...remainingProps
}) {
  const inputRef = useRef();

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
        onChangeText={onChange}
        fontSize={16}
        keyboardType={keyboardType}
        keyboardAppearance="dark"
        tintColor="#2464eb"
        onFocus={onPress && handleFocus}
        showSoftInputOnFocus={!onPress}
        {...remainingProps}
      />
    </View>
  );
}
