export default {
    expo: {
      name: 'YourAppName',
      // ... other existing config ...
      extra: {
        WEATHER_API_KEY: process.env.WEATHER_API_KEY,
        API_BASE_URL: process.env.API_BASE_URL,
        DEFAULT_LOCATION: process.env.DEFAULT_LOCATION,
      },
    },
  };