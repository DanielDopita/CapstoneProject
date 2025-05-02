import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ApiService from '../services/api';

const NurseAvailability = () => {
  const [nurses, setNurses] = useState([]);

  useEffect(() => {
    ApiService.getNurses()
      .then(data => setNurses(data.nurses))
      .catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nurse Availability</Text>
      <View style={styles.grid}>
        {nurses.map((nurse, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.text}>{nurse.department}</Text>
            <Text style={styles.subtext}>{nurse.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#333',
    width: '23%',
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtext: {
    color: '#bbb',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default NurseAvailability;