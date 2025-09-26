import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import PersonalInfoSection from './components/InfoPessoaisComponent';
import AddressSection from './components/InfoEnderecoComponent';
import AccountInfoSection from './components/InfoContaComponent';
import globalStyles from './style/globalStyles';
import Footer from './components/FooterComponent';

export default function App() {
  const [values, setValues] = useState({
    nomeCompleto: '',
    dataNascimento: '',
    idade: null,
    cpf: '',
    telefoneFixo: '',
    celular: '',
    nomePai: '',
    nomeMae: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    cidade: '',
    estado: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  // Função de validação global para garantir atualização dos erros no submit
  const validateAll = () => {
    let newErrors = {};

    // Nome Completo
    if (!values.nomeCompleto || values.nomeCompleto.trim().split(' ').length < 2)
      newErrors.nomeCompleto = 'Digite nome e sobrenome.';

    // Data de Nascimento
    if (!values.dataNascimento || !/^(\d{2})\/(\d{2})\/(\d{4})$/.test(values.dataNascimento)) {
      newErrors.dataNascimento = 'Data inválida.';
    } else {
      const [dia, mes, ano] = values.dataNascimento.split('/');
      // Data usando Date(ano, mes-1, dia)
      const dt = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
      if (
        isNaN(dt.getTime()) ||
        dt.getFullYear() !== parseInt(ano) ||
        dt.getMonth() + 1 !== parseInt(mes) ||
        dt.getDate() !== parseInt(dia) ||
        dt > new Date() ||
        dt.getFullYear() < 1900
      ) {
        newErrors.dataNascimento = 'Data inválida.';
      }
    }

    // CPF
    const cpf = (values.cpf || '').replace(/[^\d]/g, '');
    function validarCPF(cpf) {
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
    if (!values.cpf || !validarCPF(cpf)) newErrors.cpf = 'CPF inválido.';

    // Celular
    if (!values.celular || !/^\(\d{2}\) 9\d{4}-\d{4}$/.test(values.celular))
      newErrors.celular = 'Formato: (11) 91234-5678';

    // Telefone Fixo (opcional)
    if (values.telefoneFixo && !/^\(\d{2}\) \d{4}-\d{4}$/.test(values.telefoneFixo))
      newErrors.telefoneFixo = 'Formato: (11) 2345-6789';

    // CEP
    if (!values.cep || (!/^\d{5}-\d{3}$/.test(values.cep) && !/^\d{8}$/.test(values.cep)))
      newErrors.cep = 'CEP inválido.';

    // Endereço
    if (!values.endereco) newErrors.endereco = 'Obrigatório.';

    // Número
    if (!values.numero) newErrors.numero = 'Obrigatório.';

    // Cidade
    if (!values.cidade) newErrors.cidade = 'Obrigatório.';

    // Estado
    if (!values.estado) newErrors.estado = 'Obrigatório.';

    // Email
    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      newErrors.email = 'Email inválido.';

    // Senha
    if (!values.senha || values.senha.length < 8)
      newErrors.senha = 'Mínimo 8 caracteres.';
    else if (!(/[A-Z]/.test(values.senha) && /[a-z]/.test(values.senha) && /\d/.test(values.senha) && /[^A-Za-z0-9]/.test(values.senha)))
      newErrors.senhaForte = 'Use maiúsculas, minúsculas, números e símbolos.';

    // Confirmar Senha
    if (!values.confirmarSenha || values.senha !== values.confirmarSenha)
      newErrors.confirmarSenha = 'Senhas não coincidem.';

    // Campos para menores de idade
    if (values.idade !== null && values.idade < 18) {
      if (!values.nomePai) newErrors.nomePai = 'Obrigatório para menores.';
      if (!values.nomeMae) newErrors.nomeMae = 'Obrigatório para menores.';
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateAll();
    const hasErrors = Object.values(newErrors).some(e => !!e);
    const requiredFields = [
      'nomeCompleto', 'dataNascimento', 'cpf', /* 'telefoneFixo', */ 'celular',
      'cep', 'endereco', 'numero', 'cidade', 'estado', 'email', 'senha', 'confirmarSenha'
    ];
    let missing = requiredFields.filter(f => !values[f]);
    if (values.idade !== null && values.idade < 18) {
      if (!values.nomePai) missing.push('nomePai');
      if (!values.nomeMae) missing.push('nomeMae');
    }
    if (hasErrors || missing.length > 0) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios corretamente.');
      return;
    }
    setTimeout(() => {
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    }, 100);
  };

  return (
    <ScrollView style={globalStyles.container} contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}>
      <StatusBar style="auto" />
      <Text style={globalStyles.formTitle}> Formulário<br />de Cadastro</Text>
      <PersonalInfoSection values={values} onChange={handleChange} errors={errors} setErrors={setErrors} />
      <AddressSection values={values} onChange={handleChange} errors={errors} setErrors={setErrors} />
      <AccountInfoSection values={values} onChange={handleChange} errors={errors} setErrors={setErrors} />
      <TouchableOpacity style={globalStyles.submitButton} onPress={handleSubmit}>
        <Text style={globalStyles.submitButtonText}>Cadastrar</Text>
      </TouchableOpacity>
      <Footer />
    </ScrollView>
  );
}
