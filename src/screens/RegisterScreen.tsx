import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Alert,
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    if (!form.firstName) {
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View style={{ flex: 1 }}>
              <ScrollView
                contentContainerStyle={{ padding: 20, alignItems: 'center' }}
                keyboardShouldPersistTaps="handled"
              >
                {/**
             * Why keyboardShouldPersistTaps?
               - Allows tapping buttons
               - Keyboard doesn’t block touch

               ** Android Special Fix :
                  On Android add this in AndroidManifest.xml:
                  <activity
                    android:windowSoftInputMode="stateAlwaysHidden|adjustResize">
                  This is mandatory for smooth behavior.  
             */}

                <View style={styles.form}>
                  <Text style={styles.title}>Registration Form</Text>

                  <Input
                    placeholder="First Name"
                    value={form.firstName}
                    onChangeText={text => handleChange('firstName', text)}
                  />
                  <Input
                    placeholder="Last Name"
                    value={form.lastName}
                    onChangeText={text => handleChange('lastName', text)}
                  />
                  <Input
                    placeholder="Email"
                    value={form.email}
                    onChangeText={text => handleChange('email', text)}
                    keyboardType="email-address"
                  />
                  <Input
                    placeholder="Phone Number"
                    value={form.phone}
                    onChangeText={text => handleChange('phone', text)}
                    keyboardType="phone-pad"
                  />

                  <Input
                    placeholder="Address"
                    value={form.address}
                    onChangeText={text => handleChange('address', text)}
                  />
                  <Input
                    placeholder="City"
                    value={form.city}
                    onChangeText={text => handleChange('city', text)}
                  />
                  <Input
                    placeholder="State"
                    value={form.state}
                    onChangeText={text => handleChange('state', text)}
                  />
                  <Input
                    placeholder="Zip Code"
                    value={form.zip}
                    onChangeText={text => handleChange('zip', text)}
                    keyboardType="numeric"
                  />
                  {/* Password */}
                  <View style={styles.passwordBox}>
                    <TextInput
                      placeholder="Password"
                      value={form.password}
                      placeholderTextColor={COLORS.placeholder}
                      onChangeText={text => handleChange('password', text)}
                      secureTextEntry={!showPassword}
                      style={styles.passwordInput}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Text style={styles.eye}>
                        {showPassword ? '🙈' : '👁️'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.passwordBox}>
                    <TextInput
                      placeholder="Confirm Password"
                      secureTextEntry={!showPassword}
                      placeholderTextColor={COLORS.placeholder}
                      value={form.confirmPassword}
                      onChangeText={text =>
                        handleChange('confirmPassword', text)
                      }
                      style={styles.passwordInput}
                    />
                    <TouchableOpacity
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <Text style={styles.eye}>
                        {showConfirmPassword ? '🙈' : '👁️'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginTop: 50, width: '60%' }}>
                    <Button title="Submit" onPress={handleSubmit} />
                  </View>
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 20,
  },
  passwordBox: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 2,
    marginBottom: 15,
    color: COLORS.text,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    padding: 14,
    fontSize: 16,
  },
  eye: {
    fontSize: 18,
    paddingHorizontal: 8,
  },
});