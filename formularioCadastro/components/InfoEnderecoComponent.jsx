import React, { useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import globalStyles from '../style/globalStyles';

function validarCEP(cep) {
  return /^\d{5}-\d{3}$/.test(cep) || /^\d{8}$/.test(cep);
}

function maskCEP(value) {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{5})(\d)/, '$1-$2')
    .slice(0, 9);
}

export default function AddressSection({ values, onChange, errors, setErrors }) {
  useEffect(() => {
    setErrors(prev => ({
      ...prev,
      cep: values.cep && !validarCEP(values.cep) ? 'CEP inválido.' : '',
      endereco: values.endereco ? '' : 'Obrigatório.',
      numero: values.numero ? '' : 'Obrigatório.',
      cidade: values.cidade ? '' : 'Obrigatório.',
      estado: values.estado ? '' : 'Obrigatório.',
    }));
  }, [values]);

  return (
    <View style={globalStyles.sectionContainer}>

      <Text style={globalStyles.sectionTitle}>🏠 Endereço</Text>
      <View style={globalStyles.inputGroup}>
        <Text style={globalStyles.label}>
          CEP <Text style={globalStyles.required}>*</Text>
        </Text>
        <TextInput
          style={[
            globalStyles.input,
            errors.cep ? globalStyles.inputError : null
          ]}
          value={values.cep}
          onChangeText={text => onChange('cep', maskCEP(text))}
          placeholder="XXXXX-XXX"
          keyboardType="numeric"
          maxLength={9}
        />
        {errors.cep ? <Text style={globalStyles.errorText}>{errors.cep}</Text> : null}
      </View>
      <View style={globalStyles.inputGroup}>
        <Text style={globalStyles.label}>
          Endereço <Text style={globalStyles.required}>*</Text>
        </Text>
        <TextInput
          style={[
            globalStyles.input,
            errors.endereco ? globalStyles.inputError : null
          ]}
          value={values.endereco}
          onChangeText={text => onChange('endereco', text)}
          placeholder="Rua, Av., etc."
          maxLength={60}
        />
        {errors.endereco ? <Text style={globalStyles.errorText}>{errors.endereco}</Text> : null}
      </View>
      <View style={globalStyles.inputGroup}>
        <Text style={globalStyles.label}>
          Número <Text style={globalStyles.required}>*</Text>
        </Text>
        <TextInput
          style={[
            globalStyles.input,
            errors.numero ? globalStyles.inputError : null
          ]}
          value={values.numero}
          onChangeText={text => onChange('numero', text.replace(/\D/g, ''))}
          placeholder="Número"
          keyboardType="numeric"
          maxLength={6}
        />
        {errors.numero ? <Text style={globalStyles.errorText}>{errors.numero}</Text> : null}
      </View>
      <View style={globalStyles.inputGroup}>
        <Text style={globalStyles.label}>
          Complemento (opcional)
        </Text>
        <TextInput
          style={globalStyles.input}
          value={values.complemento}
          onChangeText={text => onChange('complemento', text)}
          placeholder="Apto, bloco, etc."
          maxLength={30}
        />
      </View>
      <View style={globalStyles.inputGroup}>
        <Text style={globalStyles.label}>
          Cidade <Text style={globalStyles.required}>*</Text>
        </Text>
        <TextInput
          style={[
            globalStyles.input,
            errors.cidade ? globalStyles.inputError : null
          ]}
          value={values.cidade}
          onChangeText={text => onChange('cidade', text)}
          placeholder="Cidade"
          maxLength={30}
        />
        {errors.cidade ? <Text style={globalStyles.errorText}>{errors.cidade}</Text> : null}
      </View>
      <View style={globalStyles.inputGroup}>
        <Text style={globalStyles.label}>
          Estado <Text style={globalStyles.required}>*</Text>
        </Text>
        <TextInput
          style={[
            globalStyles.input,
            errors.estado ? globalStyles.inputError : null
          ]}
          value={values.estado}
          onChangeText={text => onChange('estado', text)}
          placeholder="Estado"
          maxLength={2}
          autoCapitalize="characters"
        />
        {errors.estado ? <Text style={globalStyles.errorText}>{errors.estado}</Text> : null}
      </View>
    </View>
  );
}
