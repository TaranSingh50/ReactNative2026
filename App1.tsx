/*
  Lesson 1: Core Components & Layout (2026-ready)
*/

import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  Button,
  Alert,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const handlePress = () => {
    Alert.alert('Button Pressed!');
  };

  return (
    // SafeAreaProvider provides context for SafeAreaView to handle device notches
    <SafeAreaProvider>
      {/* SafeAreaView ensures content stays inside safe area (avoiding notches/status bars) */}
      <SafeAreaView style={styles.container}>
        {/* StatusBar sets the color and style of the top device bar */}
        <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>
            Welcome to My First React Native App!
          </Text>
          <Image
            style={styles.logo}
            source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          />
          <View style={{ marginBottom: 20 }}>
            <Button title="Click Me" onPress={handlePress} />
          </View>
          <Text style={styles.footer}>Happy Coding!</Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollView: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
  footer: {
    fontSize: 16,
    color: '#333',
    marginTop: 40,
  },
});
