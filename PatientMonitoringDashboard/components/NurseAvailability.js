import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const NurseAvailability = () => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <Text style={styles.header}>Nurse Availability</Text>
      <Text style={styles.text}>ER: Nurse #1</Text>
      <Text style={styles.text}>OB: Nurse #2</Text>
      <Text style={styles.text}>PCU: Nurse #3</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 10,
  },
  header: {
    fontSize: 28, // Larger font for TV screens
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 24, // Larger font for TV screens
  },
});

export default NurseAvailability;