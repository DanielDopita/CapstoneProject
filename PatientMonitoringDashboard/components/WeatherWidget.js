import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WeatherWidget = () => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <Text style={styles.text}>Weather information goes here.</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 10,
    width: '48%', // Fits in the top row grid
  },
  text: {
    color: 'white',
    fontSize: 24, // Larger font for TV screens
  },
});

export default WeatherWidget;