import React from 'react';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator } from 'react-native';
import TimeDateWidget from './TimeDateWidget';
import WeatherWidget from './WeatherWidget';
import PatientStatusTable from './PatientStatusTable';
import NurseAvailability from './NurseAvailability';

// Improved ErrorBoundary component
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Component Error</Text>
          <Text style={styles.errorSubtext}>
            {this.state.error?.message || 'Unknown error occurred'}
          </Text>
          <ActivityIndicator color="#fff" />
        </View>
      );
    }

    return this.props.children;
  }
}

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      {/* Left Column - Time & Weather (25%) */}
      <View style={styles.leftColumn}>
        <ErrorBoundary>
          <TimeDateWidget />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <WeatherWidget />
        </ErrorBoundary>
      </View>

      {/* Right Column - Main Content (75%) */}
      <View style={styles.rightColumn}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ErrorBoundary>
            <PatientStatusTable />
          </ErrorBoundary>

          <ErrorBoundary>
            <NurseAvailability />
          </ErrorBoundary>

          <View style={styles.alertSection}>
            <Text style={styles.alertText}>Intranet Alerts Go Here!</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#000',
  },
  leftColumn: {
    width: '25%',
    marginRight: 20,
  },
  rightColumn: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  alertSection: {
    padding: 15,
    backgroundColor: '#222',
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  alertText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  errorContainer: {
    backgroundColor: '#300',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  errorSubtext: {
    color: '#ff9999',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default DashboardScreen;