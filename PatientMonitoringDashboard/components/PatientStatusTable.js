import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const PatientStatusTable = () => {
  const patients = [
    { room: '101', risk: 'HIGH', reason: 'CONF', checkIn: '12:00 AM' },
    { room: '102', risk: 'MOD', reason: 'DETOX', checkIn: '12:00 AM' },
    { room: '103', risk: 'LOW', reason: 'SUIC', checkIn: '12:00 AM' },
    { room: '104', risk: 'LOW', reason: 'PROT CUST', checkIn: '12:00 AM' },
    { room: '105', risk: 'UNK', reason: 'INFO', checkIn: '12:00 AM' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Patient Status</Text>
      <FlatList
        data={patients}
        keyExtractor={(item) => item.room}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.text}>{item.room}</Text>
            <Text style={styles.text}>{item.risk}</Text>
            <Text style={styles.text}>{item.reason}</Text>
            <Text style={styles.text}>{item.checkIn}</Text>
          </View>
        )}
      />
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
    fontSize: 28, // Larger font for TV screens
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 24, // Larger font for TV screens
  },
});

export default PatientStatusTable;