
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

const Calculadora = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSum = () => {
    const n1 = parseFloat(num1.replace(',', '.'));
    const n2 = parseFloat(num2.replace(',', '.'));
    if (isNaN(n1) || isNaN(n2)) {
      setError('Insira números válidos!');
      setResult('');
      return;
    }
    setResult((n1 + n2).toString());
    setError('');
  };

  const handleClear = () => {
    setNum1('');
    setNum2('');
    setResult('');
    setError('');
  };

  return (
    <View style={styles.calcBody}>
      <View style={styles.calcInnerBorder}>
        <View style={styles.displayBox}>
          <Text style={styles.displayText}>{result || '0'}</Text>
        </View>
        <View style={styles.inputsRow}>
          <TextInput
            style={styles.input}
            value={num1}
            onChangeText={setNum1}
            placeholder="--"
            keyboardType="numeric"
            maxLength={10}
            placeholderTextColor="#71bffe"
          />
          <Text style={styles.plus}>+</Text>
          <TextInput
            style={styles.input}
            value={num2}
            onChangeText={setNum2}
            placeholder="--"
            keyboardType="numeric"
            maxLength={10}
            placeholderTextColor="#71bffe"
          />
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleSum}>
            <Text style={styles.buttonText}>Somar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calcBody: {
    backgroundColor: '#2b59a1',
    borderRadius: 28,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#40396e',
    shadowOpacity: 0.5,
    shadowRadius: 12,
    width: '100%',
    maxWidth: 400,
    borderWidth: 14,
    borderColor: '#f0f0f0',
  },
  calcInnerBorder: {
    borderRadius: 15,
    padding: 20,
    width: '100%',
    borderWidth: 8,
    borderColor: '#40396e',
    alignItems: 'center',
  },
  displayBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '100%',
    minHeight: 54,
    marginBottom: 18,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 6,
    elevation: 2,
  },
  displayText: {
    fontSize: 32,
    color: '#40396e',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  inputsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  input: {
    width: 120,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 22,
    backgroundColor: '#dbefff',
    color: '#2b59a1',
    margin: 10,
    textAlign: 'center',
    elevation: 2,
  },
  plus: {
    fontSize: 32,
    color: '#fa4f4fff',
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
    marginTop: 30,
    marginBottom: 5,
    gap: 20,
  },
  button: {
    backgroundColor: '#4599df',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 14,
    marginRight: 8,
    elevation: 2,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  clearButton: {
    backgroundColor: '#fa4f4f',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 14,
    elevation: 2,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  error: {
    color: '#fa4f4f',
    fontSize: 16,
    marginTop: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Calculadora;
