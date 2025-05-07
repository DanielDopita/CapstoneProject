import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { WEATHER_API_KEY, DEFAULT_LOCATION } from '@env';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationName, setLocationName] = useState(DEFAULT_LOCATION || 'Hays, Kansas');

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        let url;
        if (lat && lon) {
          url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${lat},${lon}`;
        } else {
          url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${DEFAULT_LOCATION || 'Hays,Kansas'}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error.message);
        }

        setWeather(data);
        if (data.location) {
          setLocationName(`${data.location.name}, ${data.location.region}`);
        }
      } catch (err) {
        console.error('Weather API Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Location permission denied - using default location');
          fetchWeather(); // Fallback to default location
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        fetchWeather(location.coords.latitude, location.coords.longitude);
      } catch (err) {
        console.warn('Location error:', err);
        fetchWeather(); // Fallback to default location
      }
    };

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Weather Unavailable</Text>
          <Text style={styles.errorSubtext}>{error}</Text>
        </View>
      ) : weather && (
        <>
          <Text style={styles.header}>{locationName}</Text>
          <Text style={styles.temperature}>{weather.current.temp_f}°F</Text>
          <Text style={styles.condition}>{weather.current.condition.text}</Text>
          <View style={styles.details}>
            <Text style={styles.detailText}>Humidity: {weather.current.humidity}%</Text>
            <Text style={styles.detailText}>Wind: {weather.current.wind_mph} mph</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    minHeight: 180,
  },
  header: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  temperature: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  condition: {
    color: '#bbb',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  detailText: {
    color: '#ddd',
    fontSize: 14,
  },
  errorContainer: {
    alignItems: 'center',
  },
  errorText: {
    color: '#ff9999',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorSubtext: {
    color: '#ffcccc',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default WeatherWidget;