import React, { useState } from 'react';
import {
  Text,
  View,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { COLORS } from '../theme/colors';
import Input from '../components/Input';

export default function RegisterScreen() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    password: '',
    confirmPassword: '',
  });

  const lastNameRef = React.useRef<TextInput>(null);
  const emailRef = React.useRef<TextInput>(null);
  const phoneRef = React.useRef<TextInput>(null);
  const addressRef = React.useRef<TextInput>(null);
  const cityRef = React.useRef<TextInput>(null);
  const stateRef = React.useRef<TextInput>(null);
  const zipRef = React.useRef<TextInput>(null);
  const passwordRef = React.useRef<TextInput>(null);
  const confirmPasswordRef = React.useRef<TextInput>(null);

  const handleChange = (key: string, value: string) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    Alert.alert('Success', 'Form submitted successfully!');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.form}>
              <Text style={styles.title}>Registration Form</Text>

              <Input
                label="First Name"
                placeholder="First Name"
                value={form.firstName}
                returnKeyType="next"
                onChangeText={text => handleChange('firstName', text)}
                onSubmitEditing={() => lastNameRef.current?.focus()}
              />
              <Input
                ref={lastNameRef}
                label="Last Name"
                placeholder="Last Name"
                value={form.lastName}
                returnKeyType="next"
                onChangeText={text => handleChange('lastName', text)}
                onSubmitEditing={() => emailRef.current?.focus()}
              />
              <Input
                ref={emailRef}
                label="Email"
                placeholder="Email"
                value={form.email}
                returnKeyType="next"
                onChangeText={text => handleChange('email', text)}
                keyboardType="email-address"
                onSubmitEditing={() => phoneRef.current?.focus()}
              />
              <Input
                ref={phoneRef}
                label="Phone Number"
                placeholder="Phone Number"
                value={form.phone}
                returnKeyType="next"
                onChangeText={text => handleChange('phone', text)}
                keyboardType="phone-pad"
                onSubmitEditing={() => addressRef.current?.focus()}
              />

              <Input
                ref={addressRef}
                label="Address"
                placeholder="Address"
                value={form.address}
                returnKeyType="next"
                onChangeText={text => handleChange('address', text)}
                onSubmitEditing={() => cityRef.current?.focus()}
              />
              <Input
                ref={cityRef}
                label="City"
                placeholder="City"
                value={form.city}
                returnKeyType="next"
                onChangeText={text => handleChange('city', text)}
                onSubmitEditing={() => stateRef.current?.focus()}
              />
              <Input
                ref={stateRef}
                label="State"
                placeholder="State"
                value={form.state}
                returnKeyType="next"
                onChangeText={text => handleChange('state', text)}
                onSubmitEditing={() => zipRef.current?.focus()}
              />
              <Input
                ref={zipRef}
                label="Zip Code"
                placeholder="Zip Code"
                value={form.zip}
                returnKeyType="next"
                onChangeText={text => handleChange('zip', text)}
                keyboardType="numeric"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
              <Input
                ref={passwordRef}
                label="Password"
                placeholder="Password"
                value={form.password}
                returnKeyType="next"
                onChangeText={text => handleChange('password', text)}
                isPassword
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
              />
              <Input
                ref={confirmPasswordRef}
                label="Confirm Password"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                returnKeyType="done"
                onChangeText={text => handleChange('confirmPassword', text)}
                isPassword
                onSubmitEditing={handleSubmit}
              />
              <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:{
    padding: 20,
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
    backgroundColor: COLORS.buttonColor,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText:{
    color: COLORS.background,
    fontSize: 16,
    fontWeight: 'bold',
  }
});
