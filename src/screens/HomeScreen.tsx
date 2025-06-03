import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, StyleSheet, ImageBackground, Alert  } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { IconButton, Menu } from 'react-native-paper';
import { useAuth } from '../context/AuthContext'
// import profilePic from '../assets/profile.jpg';

const services = [
  { id: '1', name: 'Doctors', icon: 'user-md', color: '#2843D0' },
  { id: '2', name: 'Pharmacy', icon: 'pills', color: '#FBF487' },
  { id: '3', name: 'Lab Tests', icon: 'flask', color: '#91C5D6' },
  { id: '4', name: 'Settings', icon: 'cogs', color: '#E27B7B' },
];

const appointments = [
  { id: '1', date: '12', day: 'Tue', doctor: 'Dr. Samuel', issue: 'Depression', color: '#2DBE78' },
  { id: '2', date: '13', day: 'Wed', doctor: 'Dr. Smith', issue: 'Anxiety', color: '#E98E36' },
];

const HomeScreen = () => {
  const { logout } = useAuth();
    const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleLogOut = async () => {
    try {
      logout();
  
    }catch (error: any) {
        Alert.alert("Login Failed", error.message);
      }
    };

    
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
        <Text style={styles.greeting}>👋 Hello!</Text>
        <Text style={styles.userName}>Supreeth Srivatsav</Text>
        </View>
        <View>
        <Menu
        visible={visible}
        
        onDismiss={closeMenu}
        anchor={
          <Image source={require('../assets/images/profilePic.png')} style={styles.avatar} />
        }
      >
        <Menu.Item onPress={() => handleLogOut()} title="Logout" />
       
      </Menu>
        {/* <Image source={require('../assets/profilePic.png')} style={styles.avatar} /> */}
        </View>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Feather name="search" size={20} color="#888" style={{ marginLeft: 10 }} />
        <TextInput placeholder="Search medical.." style={styles.searchInput} />
        <Feather name="sliders" size={20} color="#888" style={{ marginRight: 10 }} />
      </View>

      {/* Services */}
      <Text style={styles.sectionTitle}>Services</Text>
      <View style={styles.servicesContainer}>
        {services.map(service => (
          <View key={service.id} style={styles.serviceItem}>
            <FontAwesome5 name={service.icon} size={24} color="#333" />
          </View>
        ))}
      </View>
      
      {/* Promo Banner */}
      <View style={styles.bestServices}>
      <ImageBackground 
      source={require('../assets/images/homePageBG.png')} 
      style={styles.banner}
      imageStyle={styles.imageStyle} // For rounded corners
    >
      <View >
        <Text style={styles.bannerTitle}>Get the Best Medical Services</Text>
        <Text style={styles.bannerText}>We provide best quality medical services without further cost.</Text>
      </View>
      </ImageBackground>
      </View>


      {/* Upcoming Appointments */}
      <View style={styles.flats} >
      <Text style={styles.upComeTitle}>Upcoming Appointments</Text>
      <FlatList
        horizontal
        data={appointments}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.appointmentCard, { backgroundColor: item.color }]}> 
            <Text style={styles.appointmentDate}>{item.date}</Text>
            <Text style={styles.appointmentDay}>{item.day}</Text>
            <Text style={styles.appointmentDoctor}>{item.doctor}</Text>
            <Text style={styles.appointmentIssue}>{item.issue}</Text>
          </View>
        )}
      />
      </View>
    </View>
  );
};





const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#D5E9E9' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 60 },
  greeting: { fontSize: 18 },
  userName: { fontSize: 22, fontWeight: 'bold' },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, marginTop: 20, padding: 10 },
  searchInput: { flex: 1, marginLeft: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  servicesContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  serviceItem: { backgroundColor: '#F8F8F8', padding: 15, borderRadius: 10 },
  imageStyle: {
    borderRadius: 35, // Rounded corners for the image
    width:'100%',
    height:190,
    
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay for better text visibility
  },
  bestServices: { width: '100%', marginTop: 20},
  banner: { borderRadius: 15},
  bannerTitle: { fontSize: 28, fontWeight: '900',fontFamily:'Segoe UI', 
    color: '#282C3F', paddingTop:40, paddingLeft:20, marginRight:130 },
  bannerText: { fontSize: 14, color: '#282C3F', paddingTop:10, paddingLeft:20, marginRight:130 },
  flats: { marginTop: 50 },
  appointmentCard: { width: 120, padding: 15, borderRadius: 10, marginRight: 10, marginTop: 10 },
  appointmentDate: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  appointmentDay: { fontSize: 14, color: '#fff' },
  appointmentDoctor: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginTop: 5 },
  appointmentIssue: { fontSize: 14, color: '#fff' },
  upComeTitle:{fontSize: 28, fontFamily:'Segoe UI Variable', fontWeight: '500'}
});

export default HomeScreen;
