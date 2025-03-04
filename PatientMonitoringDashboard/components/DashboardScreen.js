import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import TimeDateWidget from './TimeDateWidget';
import WeatherWidget from './WeatherWidget';
import PatientStatusTable from './PatientStatusTable';
import NurseAvailability from './NurseAvailability';

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      {/* Left Column: Time & Weather */}
      <View style={styles.leftColumn}>
        <TimeDateWidget />
        <WeatherWidget />
      </View>

      {/* Right Column: Dashboard */}
      <ScrollView style={styles.rightColumn}>
        <PatientStatusTable />
        <NurseAvailability />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Arrange children in a row
    padding: 20,
    backgroundColor: '#000',
  },
  leftColumn: {
    width: '30%', // Fixed width for Time & Weather
    marginRight: 20, // Add spacing between columns
  },
  rightColumn: {
    flex: 1, // Takes up the remaining space (majority of the screen)
  },
});

export default DashboardScreen;