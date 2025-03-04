import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TimeDateWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      <Text style={styles.date}>{currentTime.toLocaleDateString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  time: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 20,
    color: 'white',
  },
});

export default TimeDateWidget;
