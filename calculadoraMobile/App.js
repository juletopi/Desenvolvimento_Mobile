import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import Calculadora from './components/Calculadora';
import Footer from './components/Footer';

export default function App() {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Calculadora />
      <Footer />
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 80,
    width: '100%',
  },
});