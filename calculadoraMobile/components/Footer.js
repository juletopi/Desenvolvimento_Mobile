import React from 'react';
import { View, Text, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <View style={styles.footer}>
      <Text style={styles.text}>
        &copy; {year} Calculadora Mobile ┃ Feito com <Text style={styles.heart}>♥️</Text> por Juletopi.
      </Text>
      <Text style={styles.linksTitle}>Me encontre aqui:</Text>
      <View style={styles.socialIcons}>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/profile.php?id=100006955867774')}>
          <FontAwesome name="facebook-square" size={20} color="#8d8d8d" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/juletopi/')}>
          <Feather name="instagram" size={20} color="#8d8d8d" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/julio-cezar-pereira-camargo/')}>
          <Feather name="linkedin" size={20} color="#8d8d8d" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://github.com/juletopi')}>
          <AntDesign name="github" size={20} color="#8d8d8d" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('http://api.whatsapp.com/send?phone=5569993606894')}>
          <MaterialCommunityIcons name="whatsapp" size={20} color="#8d8d8d" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#161616',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 10,
    marginTop: 100,
    width: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  text: {
    color: '#c5c5c5',
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 20,
    marginTop: -5,
  },
  heart: {
    color: '#f03636',
    fontSize: 9,
  },
  linksTitle: {
    color: '#c5c5c5',
    marginTop: -10,
    fontSize: 12,
    textAlign: 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 25,
    marginTop: 20,
    marginBottom: 10,
  },
  icon: {
    marginHorizontal: 10,
  }
});