import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import ApiService from '../services/api';

const PatientStatusTable = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await ApiService.getPatients();
        setPatients(data.patients || []);
      } catch (err) {
        console.error('Patient data load failed:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Data load failed</Text>
        <Text style={styles.errorSubtext}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Patient Status</Text>
      <FlatList
        data={patients}
        keyExtractor={(item) => `${item.case}-${item.room}`}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.text}>Room: {item.room}</Text>
            <Text style={styles.text}>Risk: {item.risk}</Text>
            <Text style={styles.text}>Reason: {item.reason}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No patients found</Text>
        }
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
    flex: 1
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center'
  },
  row: {
    backgroundColor: '#333',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginBottom: 4
  },
  loader: {
    marginVertical: 20
  },
  errorContainer: {
    backgroundColor: '#300',
    padding: 15,
    borderRadius: 8,
    margin: 15,
    alignItems: 'center'
  },
  errorText: {
    color: '#ff9999',
    fontSize: 18,
    fontWeight: 'bold'
  },
  errorSubtext: {
    color: '#ffcccc',
    fontSize: 14,
    marginTop: 5
  },
  emptyText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16
  }
});

export default PatientStatusTable;