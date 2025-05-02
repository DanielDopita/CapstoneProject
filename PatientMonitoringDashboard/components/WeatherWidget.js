import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, PermissionsAndroid, Platform } from 'react-native';
import { WEATHER_API_KEY } from '@env';
import Geolocation from 'react-native-geolocation-service';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationName, setLocationName] = useState('Hays, Kansas');

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        let url;
        if (lat && lon) {
          url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${lat},${lon}`;
        } else {
          url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=Hays,Kansas`;
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

    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
              (position) => {
                fetchWeather(position.coords.latitude, position.coords.longitude);
              },
              (error) => {
                console.warn('Location error:', error);
                fetchWeather(); // Fallback to Hays, KS
              },
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
          } else {
            fetchWeather(); // Fallback to Hays, KS
          }
        } catch (err) {
          console.warn('Permission error:', err);
          fetchWeather(); // Fallback to Hays, KS
        }
      } else {
        // For iOS
        Geolocation.getCurrentPosition(
          (position) => {
            fetchWeather(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.warn('Location error:', error);
            fetchWeather(); // Fallback to Hays, KS
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    };

    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
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
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default WeatherWidget;