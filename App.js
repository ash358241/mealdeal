import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Colors from './assets/Colors';
import { AntDesign } from '@expo/vector-icons';
import SafeAndroidView from './src/components/SafeAndroidView';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Details from './src/screens/Details';


const { Navigator, Screen } = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={SafeAndroidView.AndroidSafeArea}>
      <NavigationContainer>
      <Navigator>
        <Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Screen name="Details" component={Details} options={{headerShown: false}}/>
      </Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}


