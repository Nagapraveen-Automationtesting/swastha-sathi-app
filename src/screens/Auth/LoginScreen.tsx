import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { useAuth } from '../../context/AuthContext'
// import { AuthService } from '../../services/apiService';
// import apiRequest from "../../services/apiService";
import { AuthService } from "../../services/apiService";

interface WelcomeScreenProps {
  navigation: NavigationProp<any>;
}

export default function LoginScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const navigation = useNavigation();
  const { login } = useAuth();
  // const { setIsLoggedIn } = useAuth();
  const validateInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;
    
    if (!emailRegex.test(emailOrMobile) && !mobileRegex.test(emailOrMobile)) {
      Alert.alert('Invalid Input', 'Please enter a valid email or 10-digit mobile number');
      return false;
    }
    return true;
  };

// const handleLogin = async () => {
//     try {
//       // Alert.alert("emailOrMobile : "+emailOrMobile)
     
//       const response = await AuthService.login({
//         email: "johndoe@example.com",
//         password: "securepassword",
//       });
  
//       Alert.alert("Login Success:");
  
//       setIsLoggedIn(true);

//       navigation.reset({
//         index: 0,
//         routes: [{ name: "MainApp" }], // Navigates to home after login
//       });
//     } catch (error:any) {
//       Alert.alert("Login Failed", error.message);
//     }
//   };


const handleLogin = async () => {
  try {
    await login("johndoe@example.com", "securepassword"); // ✅ Call login()

    Alert.alert("Login Success:");

    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "MainApp" }],
      });
    }, 100);

  } catch (error: any) {
    Alert.alert("Login Failed", error.message);
  }
};

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#00BFD8', '#00BFD8']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Log In</Text>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome</Text>
        {/* <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text> */}

        <Text style={styles.label}>Email or Mobile Number</Text>
        <TextInput style={styles.input} placeholder="example@example.com" keyboardType="email-address" 
        value={emailOrMobile}
        onChangeText={setEmailOrMobile}/>

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput style={styles.input} secureTextEntry={!passwordVisible} placeholder="********" 
          onChangeText={setPassword}/>
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={20} color="#333" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forget Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>or sign up with</Text>
        <View style={styles.socialContainer}>
          <Ionicons name="logo-google" size={30} color="#00BFD8" />
          <Ionicons name="logo-facebook" size={30} color="#00BFD8" />
          <Ionicons name="finger-print" size={30} color="#00BFD8" />
        </View>

        {/* <TouchableOpacity onPress={() => navigation.navigate('SignUp')}> 
          <Text style={styles.signupText}>Don’t have an account? <Text style={{ color: '#00BFD8' }}>Sign Up</Text></Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', marginTop:50, height:80},
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 10, 
    alignItems:'center', alignContent:'center' },
  content: { padding: 20, alignItems: 'center', marginTop:30 },
  welcomeText: { fontSize: 22, fontWeight: 'bold', color: '#00BFD8' },
  description: { fontSize: 14, color: '#888', textAlign: 'center', marginVertical: 10 },
  label: { alignSelf: 'flex-start', marginTop: 20, fontSize: 16, fontWeight: 'bold' },
  input: { width: '100%', height: 50, padding: 12, borderRadius: 10, backgroundColor: '#f5f5f5', 
    marginTop: 5, marginLeft:5, marginRight:5 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
  forgotPassword: { alignSelf: 'flex-end', marginVertical: 10, color: '#00BFD8', fontWeight: 'bold' },
  loginButton: { width: '100%', backgroundColor: '#00BFD8', padding: 15, borderRadius: 30, alignItems: 'center', marginVertical: 10 },
  loginText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  orText: { marginVertical: 10, color: '#aaa' },
  socialContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '60%', marginBottom: 20 },
  signupText: { fontSize: 14, color: '#333', marginTop: 10 },
});
