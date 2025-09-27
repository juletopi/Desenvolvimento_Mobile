import React from 'react';
import { View, Text, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <View style={styles.footer}>
      <Text style={styles.text}>
        &copy; {year} Consulta de Endereço ┃ Feito com <Text style={styles.heart}>♥️</Text> e <Text style={styles.coffee}>☕</Text> por Juletopi.
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
    paddingBottom: 20,
    marginLeft: -20,
    marginRight: -20,
    paddingHorizontal: 20,
  },
  text: {
    color: '#c5c5c5',
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 20,
  },
  heart: {
    color: '#dc3545',
    fontSize: 12,
  },
  coffee: {
    fontSize: 12,
  },
  linksTitle: {
    color: '#c5c5c5',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 15,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 25,
    marginBottom: 10,
  },
  icon: {
    marginHorizontal: 10,
  }
});
