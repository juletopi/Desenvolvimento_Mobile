import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useState } from 'react';
import FormConsulta from './components/FormConsulta';
import ResultArea from './components/ResultArea';
import Footer from './components/Footer';
import { consultarCEP } from './components/CepAPI';
import globalStyles from './style/globalStyles';

export default function App() {
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConsultar = async (cep) => {
    setLoading(true);
    setErro(null);
    setResultado(null);

    try {
      const dados = await consultarCEP(cep);
      setResultado(dados);
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>
        <FormConsulta onConsultar={handleConsultar} loading={loading} />
        <ResultArea resultado={resultado} erro={erro} loading={loading} />
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
