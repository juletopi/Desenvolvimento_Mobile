import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import globalStyles from '../style/globalStyles';
import { formatarCEP } from './CepAPI';

export default function FormConsulta({ onConsultar, loading }) {
  const [cep, setCep] = useState('');
  const [inputFocused, setInputFocused] = useState(false);

  const handleCepChange = (text) => {
    // Remove caracteres não numéricos e limita a 8 dígitos
    const cepLimpo = text.replace(/\D/g, '').substring(0, 8);
    setCep(formatarCEP(cepLimpo));
  };

  const handleSubmit = () => {
    if (cep.length >= 8 && !loading) {
      onConsultar(cep);
    }
  };

  const isValidCep = cep.replace(/\D/g, '').length === 8;

  return (
    <View style={globalStyles.mainCard}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>Consulta de Endereço</Text>
        <Text style={globalStyles.subtitle}>Digite um CEP para consultar informações de endereço</Text>
      </View>
      
      <View style={globalStyles.infoBox}>
        <Text style={globalStyles.infoText}>
          ℹ️ Digite apenas os números do CEP. A formatação será aplicada automaticamente.
        </Text>
      </View>

      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.inputLabel}>CEP</Text>
        <TextInput
          style={[
            globalStyles.input,
            inputFocused && globalStyles.inputFocused
          ]}
          placeholder="Digite o CEP (ex: 01310-100)"
          value={cep}
          onChangeText={handleCepChange}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          keyboardType="numeric"
          maxLength={9}
          editable={!loading}
        />
      </View>
      
      <TouchableOpacity
        style={[
          globalStyles.button,
          (!isValidCep || loading) && globalStyles.buttonDisabled
        ]}
        onPress={handleSubmit}
        disabled={!isValidCep || loading}
      >
        <Text style={globalStyles.buttonText}>
          {loading ? 'Consultando...' : 'Consultar CEP'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
