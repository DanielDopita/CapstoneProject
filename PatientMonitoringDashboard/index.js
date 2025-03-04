import { registerRootComponent } from 'expo';
import App from './App';

// Ensures the app is set up correctly whether in Expo Go or a native build
// If you are not using Expo, replace it with this version:
//import { AppRegistry } from 'react-native';
//import App from './App';
//import { name as appName } from './app.json';
//AppRegistry.registerComponent(appName, () => App);

registerRootComponent(App);
