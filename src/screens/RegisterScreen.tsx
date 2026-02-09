import React, { useState, useRef } from 'react';
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
import { validateForm } from '../utils/validators';
import { registerUser } from '../api/authApi';

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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const inputPositions = useRef<Record<string, number>>({});
  const scrollRef = useRef<ScrollView>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const firstNameRef = React.useRef<TextInput>(null);
  const lastNameRef = React.useRef<TextInput>(null);
  const emailRef = React.useRef<TextInput>(null);
  const phoneRef = React.useRef<TextInput>(null);
  const addressRef = React.useRef<TextInput>(null);
  const cityRef = React.useRef<TextInput>(null);
  const stateRef = React.useRef<TextInput>(null);
  const zipRef = React.useRef<TextInput>(null);
  const passwordRef = React.useRef<TextInput>(null);
  const confirmPasswordRef = React.useRef<TextInput>(null);

  // Map field names to refs
  const inputRefs: Record<string, React.RefObject<TextInput | null>> = {
    firstName: firstNameRef,
    lastName: lastNameRef,
    email: emailRef,
    phone: phoneRef,
    address: addressRef,
    city: cityRef,
    state: stateRef,
    zip: zipRef,
    password: passwordRef,
    confirmPassword: confirmPasswordRef,
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

  // const validateForm = () => {
  //   const newErrors: Record<string,string> = {};

  //   if(!form.firstName.trim()){
  //     newErrors.firstName = 'First name is required';
  //   }

  //   if(!form.lastName.trim()){
  //     newErrors.lastName = 'Last name is required';
  //   }

  //   if(!form.email.trim()){
  //     newErrors.email = 'Email is required';
  //   } else if(!/\S+@\S+\.\S+/.test(form.email)){
  //     newErrors.email = 'Email is invalid';
  //   }

  //   if(!form.phone.trim()){
  //     newErrors.phone = 'Phone number is required';
  //   } else if(!/^\d{10}$/.test(form.phone)){
  //     newErrors.phone = 'Phone number must be 10 digits';
  //   }

  //   if(!form.password){
  //     newErrors.password = 'Password is required';
  //   } else if(form.password.length < 6){
  //     newErrors.password = 'Password must be at least 6 characters';
  //   }

  //   if(form.confirmPassword !== form.password){
  //     newErrors.confirmPassword = 'Passwords do not match';
  //   }

  //   setErrors(newErrors);

  //   return Object.keys(newErrors).length === 0;
  // }

  const handleSubmit = async () => {
    // if(!validateForm()) return;
    if (isSubmitting) return; // Prevent multiple submissions

    const validationErrors = validateForm(form);
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

    setApiError('');
    setIsSubmitting(true);

    try {
      // Simulate API call
      // await new Promise<void>(resolve => setTimeout(resolve, 1500));

      /* const response = await registerUser({
        name: form.firstName,
        email: form.email,
        password: form.password,
      }); */
      Keyboard.dismiss();
      await registerUser(form);

      Alert.alert('Success', 'Form submitted successfully!');
    } catch (error: any) {
      setApiError(
        error instanceof Error ? error.message : 'An unexpected error occurred',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
              <Text style={styles.title}>Registration Form</Text>
              {/**onLayout: Hey, this component is X pixels from top*/}
              <Input
                ref={firstNameRef}
                label="First Name"
                placeholder="First Name"
                value={form.firstName}
                returnKeyType="next"
                onChangeText={text => handleChange('firstName', text)}
                onSubmitEditing={() => lastNameRef.current?.focus()}
                error={errors.firstName}
                onPosition={y => {
                  inputPositions.current.firstName = y;
                }}
              />
              <Input
                ref={lastNameRef}
                label="Last Name"
                placeholder="Last Name"
                value={form.lastName}
                returnKeyType="next"
                onChangeText={text => handleChange('lastName', text)}
                onSubmitEditing={() => emailRef.current?.focus()}
                error={errors.lastName}
                onPosition={y => {
                  inputPositions.current.lastName = y;
                }}
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
                error={errors.email}
                onPosition={y => {
                  inputPositions.current.email = y;
                }}
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
                error={errors.phone}
                onPosition={y => {
                  inputPositions.current.phone = y;
                }}
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
                error={errors.password}
                onPosition={y => {
                  inputPositions.current.password = y;
                }}
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
                error={errors.confirmPassword}
                onPosition={y => {
                  inputPositions.current.confirmPassword = y;
                }}
              />
              <TouchableOpacity
                style={[
                  styles.buttonContainer,
                  isSubmitting && styles.disabledButton,
                ]}
                onPress={handleSubmit}
                disabled={isSubmitting}
                accessibilityRole="button"
                accessibilityState={{ disabled: isSubmitting }}
              >
                <Text style={styles.buttonText}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Text>
              </TouchableOpacity>

              {apiError ? (
                <Text style={styles.errorText}>{apiError}</Text>
              ) : null}
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
