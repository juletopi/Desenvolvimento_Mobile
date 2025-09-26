import React, { useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import globalStyles from '../style/globalStyles';

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarSenha(senha) {
  return senha.length >= 8;
}

function senhaForte(senha) {
  return /[A-Z]/.test(senha) && /[a-z]/.test(senha) && /\d/.test(senha) && /[^A-Za-z0-9]/.test(senha);
}

export default function AccountInfoSection({ values, onChange, errors, setErrors }) {
  useEffect(() => {
    setErrors(prev => ({
      ...prev,
      email: values.email && !validarEmail(values.email) ? 'Email inválido.' : '',
      senha: values.senha && !validarSenha(values.senha) ? 'Mínimo 8 caracteres.' : '',
      senhaForte: values.senha && !senhaForte(values.senha) ? 'Use maiúsculas, minúsculas, números e símbolos.' : '',
      confirmarSenha: values.confirmarSenha && values.senha !== values.confirmarSenha ? 'Senhas não coincidem.' : '',
    }));
  }, [values]);

  return (
    <View style={globalStyles.sectionContainer}>
      <Text style={globalStyles.sectionTitle}>📧 Conta</Text>
      <View style={globalStyles.inputGroup}>
        <Text style={globalStyles.label}>
          Email <Text style={globalStyles.required}>*</Text>
        </Text>
        <TextInput
          style={[
            globalStyles.input,
            errors.email ? globalStyles.inputError : null
          ]}
          value={values.email}
          onChangeText={text => onChange('email', text)}
          placeholder="usuario@dominio.com"
          keyboardType="email-address"
          autoCapitalize="none"
          maxLength={60}
        />
        {errors.email ? <Text style={globalStyles.errorText}>{errors.email}</Text> : null}
      </View>
      <View style={globalStyles.inputGroup}>
        <Text style={globalStyles.label}>
          Senha <Text style={globalStyles.required}>*</Text>
        </Text>
        <TextInput
          style={[
            globalStyles.input,
            errors.senha || errors.senhaForte ? globalStyles.inputError : null
          ]}
          value={values.senha}
          onChangeText={text => onChange('senha', text)}
          placeholder="Senha"
          secureTextEntry
          maxLength={32}
        />
        {errors.senha ? <Text style={globalStyles.errorText}>{errors.senha}</Text> : null}
        {errors.senhaForte ? <Text style={globalStyles.errorText}>{errors.senhaForte}</Text> : null}
      </View>
      <View style={globalStyles.inputGroup}>
        <Text style={globalStyles.label}>
          Confirmar Senha <Text style={globalStyles.required}>*</Text>
        </Text>
        <TextInput
          style={[
            globalStyles.input,
            errors.confirmarSenha ? globalStyles.inputError : null
          ]}
          value={values.confirmarSenha}
          onChangeText={text => onChange('confirmarSenha', text)}
          placeholder="Confirme a senha"
          secureTextEntry
          maxLength={32}
        />
        {errors.confirmarSenha ? <Text style={globalStyles.errorText}>{errors.confirmarSenha}</Text> : null}
      </View>
    </View>
  );
}
