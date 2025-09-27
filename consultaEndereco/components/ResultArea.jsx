import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import globalStyles from '../style/globalStyles';

export default function ResultArea({ resultado, erro, loading }) {
  if (loading) {
    return (
      <View style={globalStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={globalStyles.loadingText}>Consultando CEP...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={globalStyles.errorContainer}>
        <Text style={globalStyles.errorText}>❌ {erro}</Text>
        <Text style={globalStyles.disclaimer}>
          Verifique se o CEP está correto e tente novamente.
        </Text>
      </View>
    );
  }

  if (resultado) {
    return (
      <View style={globalStyles.fieldset}>
        <Text style={globalStyles.legend}>✅ Informações do Endereço</Text>
        
        <View style={globalStyles.resultRow}>
          <Text style={globalStyles.resultLabel}>CEP:</Text>
          <Text style={globalStyles.resultValue}>{resultado.cep}</Text>
        </View>
        
        {resultado.logradouro && (
          <View style={globalStyles.resultRow}>
            <Text style={globalStyles.resultLabel}>Logradouro:</Text>
            <Text style={globalStyles.resultValue}>{resultado.logradouro}</Text>
          </View>
        )}
        
        {resultado.complemento && (
          <View style={globalStyles.resultRow}>
            <Text style={globalStyles.resultLabel}>Complemento:</Text>
            <Text style={globalStyles.resultValue}>{resultado.complemento}</Text>
          </View>
        )}
        
        {resultado.bairro && (
          <View style={globalStyles.resultRow}>
            <Text style={globalStyles.resultLabel}>Bairro:</Text>
            <Text style={globalStyles.resultValue}>{resultado.bairro}</Text>
          </View>
        )}
        
        <View style={globalStyles.resultRow}>
          <Text style={globalStyles.resultLabel}>Cidade:</Text>
          <Text style={globalStyles.resultValue}>{resultado.localidade}</Text>
        </View>
        
        <View style={globalStyles.resultRow}>
          <Text style={globalStyles.resultLabel}>Estado:</Text>
          <Text style={globalStyles.resultValue}>{resultado.uf}</Text>
        </View>
        
        {resultado.ddd && (
          <View style={globalStyles.resultRow}>
            <Text style={globalStyles.resultLabel}>DDD:</Text>
            <Text style={globalStyles.resultValue}>{resultado.ddd}</Text>
          </View>
        )}

        <Text style={globalStyles.disclaimer}>
          ⚠️ Informações obtidas através da API ViaCEP.<br />Para dados oficiais, consulte os Correios.
        </Text>
      </View>
    );
  }

  return null;
}
