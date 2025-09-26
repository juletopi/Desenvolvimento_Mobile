import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import globalStyles from '../style/globalStyles';

function calcularIdade(dataNascimento) {
  // Aceita apenas DD/MM/AAAA
  const parts = dataNascimento.split('/');
  if (parts.length !== 3) return null;
  const [dia, mes, ano] = parts;
  const nascimento = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
  if (
    isNaN(nascimento.getTime()) ||
    nascimento.getDate() !== parseInt(dia) ||
    nascimento.getMonth() + 1 !== parseInt(mes) ||
    nascimento.getFullYear() !== parseInt(ano)
  ) {
    return null;
  }
  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
}

function validarNomeCompleto(nome) {
  return nome.trim().split(' ').length >= 2;
}

function validarDataNascimento(data) {
  // Aceita apenas DD/MM/AAAA
  if (!/^(\d{2})\/(\d{2})\/(\d{4})$/.test(data)) return false;
  const [dia, mes, ano] = data.split('/');
  const dt = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
  if (
    isNaN(dt.getTime()) ||
    dt.getDate() !== parseInt(dia) ||
    dt.getMonth() + 1 !== parseInt(mes) ||
    dt.getFullYear() !== parseInt(ano)
  ) {
    return false;
  }
  // Não permitir datas futuras ou muito antigas
  const hoje = new Date();
  if (dt > hoje || dt.getFullYear() < 1900) return false;
  return true;
}

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let soma = 0, resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i-1]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i-1]) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf[10]);
}

function validarTelefoneFixo(tel) {
  return /^\(\d{2}\) \d{4}-\d{4}$/.test(tel);
}

function validarCelular(cel) {
  return /^\(\d{2}\) 9\d{4}-\d{4}$/.test(cel);
}

function maskCPF(value) {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
    .slice(0, 14);
}

function maskTelefoneFixo(value) {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .slice(0, 14);
}

function maskCelular(value) {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15);
}

function maskDataNascimento(value) {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '$1/$2')
    .replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3')
    .slice(0, 10);
}

export default function PersonalInfoSection({ values, onChange, errors, setErrors }) {
  const [idade, setIdade] = useState(null);

  useEffect(() => {
    if (validarDataNascimento(values.dataNascimento)) {
      const idadeCalc = calcularIdade(values.dataNascimento);
      setIdade(idadeCalc);
      onChange('idade', idadeCalc);
    } else {
      setIdade(null);
      onChange('idade', null);
    }
  }, [values.dataNascimento]);

  // Validações em tempo real
  useEffect(() => {
    setErrors(prev => ({
      ...prev,
      nomeCompleto: values.nomeCompleto && !validarNomeCompleto(values.nomeCompleto) ? 'Digite nome e sobrenome.' : '',
      dataNascimento: values.dataNascimento && !validarDataNascimento(values.dataNascimento) ? 'Data inválida.' : '',
      cpf: values.cpf && !validarCPF(values.cpf) ? 'CPF inválido.' : '',
      telefoneFixo: values.telefoneFixo
        ? (!validarTelefoneFixo(values.telefoneFixo) ? 'Formato: (11) 2345-6789' : '')
        : '', // Não obrigatório
      celular: values.celular && !validarCelular(values.celular) ? 'Formato: (11) 91234-5678' : '',
      nomePai: idade !== null && idade < 18 && !values.nomePai ? 'Obrigatório para menores.' : '',
      nomeMae: idade !== null && idade < 18 && !values.nomeMae ? 'Obrigatório para menores.' : '',
    }));
  }, [values, idade]);

  return (
    <View style={globalStyles.sectionContainer}>
      <Text style={globalStyles.sectionTitle}>Info. Pessoais</Text>
      <View style={globalStyles.inputGroup}>
        <Text style={globalStyles.label}>
          Nome Completo <Text style={globalStyles.required}>*</Text>
        </Text>
        <TextInput
          style={[
            globalStyles.input,
            errors.nomeCompleto ? globalStyles.inputError : null
          ]}
          value={values.nomeCompleto}
          onChangeText={text => onChange('nomeCompleto', text)}
          placeholder="Nome e sobrenome"
          maxLength={60}
        />
        {errors.nomeCompleto ? <Text style={globalStyles.errorText}>{errors.nomeCompleto}</Text> : null}
      </View>
      <View style={globalStyles.inputGroup}>
        <Text style={globalStyles.label}>
          Data de Nascimento <Text style={globalStyles.required}>*</Text>
        </Text>
        <TextInput
          style={[
            globalStyles.input,
            errors.dataNascimento ? globalStyles.inputError : null
          ]}
          value={values.dataNascimento}
          onChangeText={text => onChange('dataNascimento', maskDataNascimento(text))}
          placeholder="DD/MM/AAAA"
          keyboardType="numeric"
          maxLength={10}
        />
        {errors.dataNascimento ? <Text style={globalStyles.errorText}>{errors.dataNascimento}</Text> : null}
        {idade !== null && <Text style={globalStyles.infoText}>Idade: {idade}</Text>}
      </View>
      <View style={globalStyles.inputGroup}>
        <Text style={globalStyles.label}>
          CPF <Text style={globalStyles.required}>*</Text>
        </Text>
        <TextInput
          style={[
            globalStyles.input,
            errors.cpf ? globalStyles.inputError : null
          ]}
          value={values.cpf}
          onChangeText={text => onChange('cpf', maskCPF(text))}
          placeholder="XXX.XXX.XXX-XX"
          keyboardType="numeric"
          maxLength={14}
        />
        {errors.cpf ? <Text style={globalStyles.errorText}>{errors.cpf}</Text> : null}
      </View>
      <View style={globalStyles.inputGroup}>
        <Text style={globalStyles.label}>
          Telefone Fixo (opcional)
        </Text>
        <TextInput
          style={[
            globalStyles.input,
            errors.telefoneFixo ? globalStyles.inputError : null
          ]}
          value={values.telefoneFixo}
          onChangeText={text => onChange('telefoneFixo', maskTelefoneFixo(text))}
          placeholder="(11) 2345-6789"
          keyboardType="phone-pad"
          maxLength={14}
        />
        {errors.telefoneFixo ? <Text style={globalStyles.errorText}>{errors.telefoneFixo}</Text> : null}
      </View>
      <View style={globalStyles.inputGroup}>
        <Text style={globalStyles.label}>
          Celular <Text style={globalStyles.required}>*</Text>
        </Text>
        <TextInput
          style={[
            globalStyles.input,
            errors.celular ? globalStyles.inputError : null
          ]}
          value={values.celular}
          onChangeText={text => onChange('celular', maskCelular(text))}
          placeholder="(11) 91234-5678"
          keyboardType="phone-pad"
          maxLength={15}
        />
        {errors.celular ? <Text style={globalStyles.errorText}>{errors.celular}</Text> : null}
      </View>
      {idade !== null && idade < 18 && (
        <>
          <View style={globalStyles.inputGroup}>
            <Text style={globalStyles.label}>
              Nome do Pai <Text style={globalStyles.required}>*</Text>
            </Text>
            <TextInput
              style={[
                globalStyles.input,
                errors.nomePai ? globalStyles.inputError : null
              ]}
              value={values.nomePai}
              onChangeText={text => onChange('nomePai', text)}
              placeholder="Nome do Pai"
              maxLength={60}
            />
            {errors.nomePai ? <Text style={globalStyles.errorText}>{errors.nomePai}</Text> : null}
          </View>
          <View style={globalStyles.inputGroup}>
            <Text style={globalStyles.label}>
              Nome da Mãe <Text style={globalStyles.required}>*</Text>
            </Text>
            <TextInput
              style={[
                globalStyles.input,
                errors.nomeMae ? globalStyles.inputError : null
              ]}
              value={values.nomeMae}
              onChangeText={text => onChange('nomeMae', text)}
              placeholder="Nome da Mãe"
              maxLength={60}
            />
            {errors.nomeMae ? <Text style={globalStyles.errorText}>{errors.nomeMae}</Text> : null}
          </View>
        </>
      )}
    </View>
  );
}
