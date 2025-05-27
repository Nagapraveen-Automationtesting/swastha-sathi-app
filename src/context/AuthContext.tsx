import React, { createContext, useContext, useState } from "react";
import { AuthService } from "../services/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      const response = await AuthService.login({ email, password });

      if (response && response.access_token) {
        await AsyncStorage.setItem("access_token", response.access_token); // ✅ Store token securely
        setIsLoggedIn(true);
      } else {
        throw new Error("Invalid credentials or missing token");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed. Please try again.");
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("access_token"); // ✅ Clear token on logout
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
