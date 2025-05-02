module.exports = {
  presets: [
    ['module:metro-react-native-babel-preset', {
      unstable_transformProfile: 'hermes-stable',
      disableImportExportTransform: false,
      inlineRequires: true
    }]
  ],
  plugins: [
    // Class properties and private methods
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    
    // Environment variables
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      safe: true,
      allowUndefined: false,
      allowlist: ['WEATHER_API_KEY', 'DEFAULT_LOCATION']
    }],
    
    // Fix for EXPO_OS warning
    ['transform-inline-environment-variables', {
      include: ['EXPO_OS']
    }]
  ]
};