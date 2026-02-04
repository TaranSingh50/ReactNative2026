/*
   Lesson 3: Full Form Handling with Multiple Inputs & Validation (React Native)
   Lesson 4: Controlled vs Uncontrolled Inputs (React Native – 2026 Standard)

   # Uncontrolled Input
   Code Example : <TextInput placeholder="Name" />

   # Controlled Input
   Code Example :
     const [name, setName] = useState('');

     <TextInput
       value={name}
       onChangeText={setName}
     />
*/
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm({
      // Copy old form data
      ...form,
      // Update only the changed field
      [key]: value,
    });
  };

  const handleSubmit = () => {
    if (!form.name) {
      Alert.alert('Error', 'Name is required');
      return;
    }

    if (!form.email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    if (form.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    Alert.alert('Success', 'Form submitted successfully!');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#e0f7fa' }}>
        <StatusBar barStyle="dark-content" />
        <ScrollView
          contentContainerStyle={{ alignItems: 'center', padding: 20 }}
        >
          <TextInput
            placeholder="Name"
            value={form.name}
            onChangeText={text => handleChange('name', text)}
            style={styles.input}
          />

          <TextInput
            placeholder="Email"
            value={form.email}
            onChangeText={text => handleChange('email', text)}
            style={styles.input}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              value={form.password}
              onChangeText={text => handleChange('password', text)}
              style={styles.input}
              secureTextEntry={!isPasswordVisible}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Text style={styles.eye}>{isPasswordVisible ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 20, width: '60%' }}>
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  passwordContainer: {
    flex: 1,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  eye: {
    fontSize: 18,
    marginLeft: 10,
  },
});
