import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MenuButton from '../components/MenuButton';

// Sample Data
const reports = [
  { id: '1', title: 'General Health', files: 8, color: '#DDEEFF' },
  { id: '2', title: 'Diabetes', files: 4, color: '#EDE7F6' },
];

const ReportsScreen = () => {



    return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Report</Text>
        <MenuButton />
      </View>

      {/* Report Summary */}
      <View style={styles.heartContainer}>
        <ImageBackground 
              source={require('../assets/heartRateBG.png')} 
              style={styles.banner}
              imageStyle={styles.imageStyle} // For rounded corners
            >
        <View style={[styles.heartCard]}>
          <Text style={styles.heartTitle}>Heart Rate</Text>
          <Text style={styles.heartvalue}>96 <Text style={styles.unit}>bpm</Text></Text>
        </View>
        </ImageBackground>
        </View>
      <View style={styles.reportContainer}>
        
        
        <LinearGradient
        colors={['#D05252', '#FFFFFF']} // Gradient colors
        style={[styles.reportCard]}
      ><View >

          <Fontisto name="blood-drop" size={24} color="#D90000" />
          <Text style={styles.reportTitle}>Blood Group</Text>
          <Text style={styles.value}>B+</Text>
          </View>
          </LinearGradient>
       
        <View style={[styles.reportCard, { backgroundColor: '#C8E6C9' }]}>
          <Text style={styles.reportTitle}>Weight</Text>
          <Text style={styles.value}>80 <Text style={styles.unit}>Kg</Text></Text>
        </View>
      </View>

      {/* Latest Reports */}
      <Text style={styles.latestTitle}>Latest Report</Text>
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.reportItem, { backgroundColor: item.color }]}>
            <Ionicons name="document-text-outline" size={24} color="#555" />
            <View style={{ flex: 1 }}>
              <Text style={styles.reportName}>{item.title}</Text>
              <Text style={styles.fileCount}>{item.files} files</Text>
            </View>
            <Ionicons name="ellipsis-horizontal" size={24} color="#333" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0EAEF',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  heartContainer: {
    width:'100%',
    height:80,
    marginVertical: 20,
    
  },
  reportContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 20,
    marginTop:30
  },
  imageStyle: {
    borderRadius: 35, // Rounded corners for the image
    width:'100%',
    height:120,
    
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay for better text visibility
  },
  banner: { borderRadius: 15},
  heartCard: {
    width: '100%',
    padding: 15,
    paddingLeft: 45,
    paddingTop:20,
    borderRadius: 12,
    alignItems: 'flex-start',
    marginBottom: 10,
    marginRight:80
  },
  reportCard: {
    width: '48%',
    padding: 15,
    borderRadius: 12,
    // alignItems: 'center',
    marginBottom: 10,
  },
  heartTitle: {
    fontSize: 17,
    color: '#000000',
    marginBottom: 5,
  },
  heartvalue: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
  },
  reportTitle: {
    fontSize: 17,
    color: '#000000',
    marginBottom: 5,
  },
  value: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  unit: {
    fontSize: 16,
    color: '#777',
  },
  latestTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  reportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  reportName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  fileCount: {
    fontSize: 14,
    color: '#777',
  },
});

export default ReportsScreen;