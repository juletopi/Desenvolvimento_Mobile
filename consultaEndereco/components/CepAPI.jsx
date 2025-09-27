export const consultarCEP = async (cep) => {
  // Remove caracteres não numéricos do CEP
  const cepLimpo = cep.replace(/\D/g, '');
  
  // Valida se o CEP tem 8 dígitos
  if (cepLimpo.length !== 8) {
    throw new Error('CEP deve conter exatamente 8 dígitos');
  }
  
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    
    if (!response.ok) {
      throw new Error('Erro na consulta do CEP');
    }
    
    const data = await response.json();
    
    // Verifica se o CEP foi encontrado
    if (data.erro) {
      throw new Error('CEP não encontrado');
    }
    
    return {
      cep: data.cep,
      logradouro: data.logradouro,
      complemento: data.complemento,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
      ibge: data.ibge,
      gia: data.gia,
      ddd: data.ddd,
      siafi: data.siafi
    };
  } catch (error) {
    if (error.message === 'CEP não encontrado' || error.message === 'CEP deve conter exatamente 8 dígitos') {
      throw error;
    }
    throw new Error('Erro de conexão. Verifique sua internet e tente novamente.');
  }
};

export const formatarCEP = (cep) => {
  const cepLimpo = cep.replace(/\D/g, '');
  return cepLimpo.replace(/(\d{5})(\d{3})/, '$1-$2');
};
