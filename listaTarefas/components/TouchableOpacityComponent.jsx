import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const TouchableOpacityComponent = ({ onPress, children, style, textStyle }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
    <Text style={[styles.text, textStyle]}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6200ee',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TouchableOpacityComponent;
