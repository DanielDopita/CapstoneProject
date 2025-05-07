module.exports = {
  presets: [
    ['module:metro-react-native-babel-preset', {
      unstable_transformProfile: 'hermes-stable',
      disableImportExportTransform: false,
      inlineRequires: true,
      babelTransformerPath: require.resolve('metro-react-native-babel-transformer')
    }]
  ],
  plugins: [
    // Class transformations
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    
    // Environment variables
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      safe: true,
      allowUndefined: false,
      allowlist: [
        'WEATHER_API_KEY',
        'DEFAULT_LOCATION'
      ]
    }]
  ]
};