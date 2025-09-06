import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const TextInputComponent = ({ value, onChangeText, placeholder, style, ...props }) => (
  <TextInput
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    style={[styles.input, style]}
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
});

export default TextInputComponent;
