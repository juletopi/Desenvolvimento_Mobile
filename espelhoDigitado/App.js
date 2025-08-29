import React from 'react';
import { View, Text } from 'react-native';
import EspelhoDigitado from './components/EspelhoDigitado';

export default function App() {
  return (
    <View>
      <Text>Digite algo e veja o texto espelhado!</Text>
      <EspelhoDigitado placeholder="Digite algo..." />
    </View>
  );
}
