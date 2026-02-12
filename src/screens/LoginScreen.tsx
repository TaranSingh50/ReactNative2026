console.log('LOGIN SCREEN RENDERED');
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  TextInput,
  ScrollView,
} from 'react-native';
import { loginApi } from '../api/authApi';
import { useApi } from '../hooks/useApi';
import Input from '../components/Input';
import { COLORS } from '../theme/colors';
import Loader from '../components/Loader';
import Toast from 'react-native-toast-message';
import { validateLoginForm } from '../utils/validators';
import { LoginRequest } from '../types/api';

export default function LoginScreen() {
  // Local form state
  const [form, setForm] = useState<LoginRequest>({
    username: 'emilys',
    password: 'emilyspass',
    expiresInMins: 30,
  });

  // Use the custom useApi hook for login
  const { data, error, loading, callApi } = useApi(loginApi, { retries: 2 });

  // Use to show field-specific errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Refs for input fields to manage focus
  const usernameRef = React.useRef<TextInput>(null);
  const passwordRef = React.useRef<TextInput>(null);

  // Ref to manage scroll position when keyboard is open
  const inputPositions = useRef<Record<string, number>>({});
  const scrollRef = useRef<ScrollView>(null);

  // Map field names to refs
  const inputRefs: Record<string, React.RefObject<TextInput | null>> = {
    username: usernameRef,
    password: passwordRef,
  };

  const handleChange = (field: string, value: string) => {
    setForm(form => ({
      ...form,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors(errors => ({
        ...errors,
        [field]: '',
      }));
    }
  };

  // handle login button press
  const onLogin = async () => {
    const validationErrors = validateLoginForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorField = Object.keys(validationErrors)[0];

      // 1️⃣ Scroll to the field
      scrollRef.current?.scrollTo({
        y: inputPositions.current[firstErrorField] - 20, // Add some padding
        animated: true,
      });

      // 2️⃣ Focus the input
      inputRefs[firstErrorField]?.current?.focus();
      return;
    }

      Keyboard.dismiss();
      const response = await callApi(form);
      console.log('LOGIN RESPONSE:', response)
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: `Token: ${response.accessToken}`,
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1 }}>
            <ScrollView
              ref={scrollRef}
              contentContainerStyle={styles.container}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.form}>
                <Text style={styles.title}>Login</Text>
                <Input
                  ref={usernameRef}
                  label="Username"
                  placeholder="Username"
                  value={form.username}
                  returnKeyType="next"
                  onChangeText={text => handleChange('username', text)}
                  keyboardType="default"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  error={errors.username}
                  onPosition={y => {
                    inputPositions.current.username = y;
                  }}
                />
                <Input
                  ref={passwordRef}
                  label="Password"
                  placeholder="Password"
                  value={form.password}
                  returnKeyType="done"
                  onChangeText={text => handleChange('password', text)}
                  isPassword
                  onSubmitEditing={onLogin}
                  error={errors.password}
                />
                <TouchableOpacity
                  style={[
                    styles.buttonContainer,
                    loading && styles.disabledButton,
                  ]}
                  onPress={onLogin}
                  disabled={loading}
                  accessibilityRole="button"
                  accessibilityState={{ disabled: loading }}
                >
                  <Text style={styles.buttonText}>
                    {loading ? 'Logging in...' : 'Login'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {loading && <Loader />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  buttonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.6,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
