import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function SignupScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validateMobile = (mobile: string) => /^[0-9]{10}$/.test(mobile);

  const handleSignup = () => {
    if (!fullName || !email || !mobile || !password || !dob) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Enter a valid email.");
      return;
    }
    if (!validateMobile(mobile)) {
      Alert.alert("Invalid Mobile", "Enter a valid 10-digit number.");
      return;
    }

    Alert.alert("Success", "Account created!");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#00BFD8', '#00BFD8']} style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>New Account</Text>
            </LinearGradient>
            <View style={styles.profileContainer}>
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="example@example.com"
        value={fullName}
        onChangeText={setFullName}
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="********"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="example@example.com"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Mobile Number</Text>
      <TextInput
        style={styles.input}
        placeholder="example@example.com"
        keyboardType="numeric"
        value={mobile}
        onChangeText={setMobile}
      />

      <Text style={styles.label}>Date of Birth</Text>
      <TextInput
        style={styles.input}
        placeholder="DD / MM / YYYY"
        value={dob}
        onChangeText={setDob}
      />

      <Text style={styles.termsText}>
        By continuing, you agree to{" "}
        <Text style={styles.linkText}>Terms of Use</Text> and{" "}
        <Text style={styles.linkText}>Privacy Policy</Text>.
      </Text>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or sign up with</Text>

      <View style={styles.socialIcons}>
        <Ionicons name="logo-google" size={30} color="#00C6FF" />
        <Ionicons name="logo-facebook" size={30} color="#00C6FF" />
        <Ionicons name="finger-print" size={30} color="#00C6FF" />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginLink}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: "#fff",
  },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 10, 
    alignItems:'center', alignContent:'center' },
    header: { flexDirection: 'row', alignItems: 'center', marginTop:50, height:80},
    profileContainer: {
        flex: 1,
        padding: 20,
        
        backgroundColor: "#fff",
      },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
  },
  termsText: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
    color: "#666",
  },
  linkText: {
    color: "#00C6FF",
    fontWeight: "bold",
  },
  signupButton: {
    backgroundColor: "#00C6FF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  signupText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  orText: {
    textAlign: "center",
    marginTop: 15,
    color: "#666",
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    gap: 20,
  },
  loginLink: {
    textAlign: "center",
    color: "#00C6FF",
    marginTop: 15,
    fontWeight: "bold",
  },
});

// export default SignupScreen;
