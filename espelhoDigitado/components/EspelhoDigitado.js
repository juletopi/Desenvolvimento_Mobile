import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const EspelhoDigitado = ({ placeholder, label = 'Você digitou:' }) => {
  const [texto, setTexto] = useState('');
  const Limpador = <Button title="Limpar" onPress={() => setTexto('')} />;

  return (
    <View>
      <TextInput
        value={texto}
        onChangeText={setTexto}
        placeholder={placeholder}
      />
      {Limpador}
      <Text>
        {texto ? `${label} ${texto}` : 'Nada digitado ainda...'}
      </Text>
    </View>
  );
};

export default EspelhoDigitado;
