/*
   Lesson 2: Handling Input & State (TextInput + useState)
*/

import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  Button,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [name, setName] = useState('');

  const handlePress = () => {
    if (name.trim() === '') {
      Alert.alert('Error', 'Please enter your name.');
    } else {
      Alert.alert('Hello', `Welcome, ${name}!`);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#e0f7fa' }}>
        <StatusBar barStyle="dark-content" />
        <ScrollView
          contentContainerStyle={{ alignItems: 'center', padding: 20 }}
        >
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
            Enter Your Name
          </Text>
          <TextInput
            style={{
              width: '80%',
              borderWidth: 1,
              borderColor: '#333',
              padding: 10,
              marginBottom:50
            }}
            placeholder="Type your name here"
            value={name}
            onChangeText={setName}
          />

          <Button title='Greet Me' onPress={handlePress}/>

          {
            name !== '' && (
              <Text style={{ marginTop: 20, fontSize: 18 }}>
                You type: {name}
              </Text>
            )
          }
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
