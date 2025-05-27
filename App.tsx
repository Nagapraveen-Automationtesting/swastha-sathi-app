// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import HomeScreen from './src/screens/HomeScreen';
// import ProfileScreen from './src/screens/ProfileScreen';
// import ReportsScreen from './src/screens/ReportsScreen';
// import { Provider as PaperProvider } from 'react-native-paper';

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <PaperProvider>
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           headerShown: false,
//           tabBarIcon: ({ color, size }) => {
//             let iconName;
//             if (route.name === 'Home') {
//               iconName = 'home-outline';
//             } else if (route.name === 'Profile') {
//               iconName = 'person-outline';
//             }else if (route.name === 'Reports') {
//               iconName = 'list-outline';
//             }
//             return <Ionicons name={iconName as any} size={size} color={color} />;
//           },
//         })}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Profile" component={ProfileScreen} />
//         <Tab.Screen name="Reports" component={ReportsScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//     </PaperProvider>
//   );
// }

import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import RootNavigator from "./src/navigation/RootNavigator";
import { AuthProvider } from "./src/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}
