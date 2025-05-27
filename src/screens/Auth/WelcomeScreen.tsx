import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { NavigationProp } from '@react-navigation/native';

interface WelcomeScreenProps {
  navigation: NavigationProp<any>;
}

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../../assets/welcomeLogo.png')} style={styles.logo} />

      {/* App Name */}
      <Text style={styles.appName}>
        <Text style={styles.boldText}>Swastha</Text>Sathi
      </Text>

      <Text style={styles.tagline}>
        Your Personalized Health Companion! 🌿
      </Text>

      {/* Description */}
      <Text style={styles.description}>
      SwasthaSathi helps you track your health, get expert doctor recommendations, analyze prescriptions, and manage medical records—all in one place. Stay informed, stay healthy.
      </Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00BFD8',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00BFD8',
    marginBottom: 30,
  },
  boldText: {
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  loginButton: {
    backgroundColor: '#00BFD8',
    paddingVertical: 12,
    width: '60%',
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#E0F7FA',
    paddingVertical: 12,
    width: '60%',
    borderRadius: 25,
    alignItems: 'center',
  },
  signupText: {
    color: '#00BFD8',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
