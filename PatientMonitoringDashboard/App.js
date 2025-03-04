import React from 'react';
import { View, StyleSheet } from 'react-native';
import DashboardScreen from './components/DashboardScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <DashboardScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Dark mode UI
  },
});

export default App;
