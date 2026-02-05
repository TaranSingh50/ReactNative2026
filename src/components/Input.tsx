import React, { forwardRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  Pressable,
} from 'react-native';
import { COLORS } from '../theme/colors';


/** TextInputProps : Inherits all native TextInput props 
 *  like keyboardType, returnKeyType, autoCapitalize, etc. No TypeScript errors. Ever.*/
type InputProps = TextInputProps & {
  label: string;
  error?: string;
  isPassword?: boolean;
};

/** forwardRef<TextInput, InputProps> : Allows parent to control focus 
    Used for: 
      - Auto-focus next input
      - “Next” keyboard button
                                                      
    Meaning in plain English:
      “This component forwards a ref to a TextInput,
       and it accepts props of type InputProps.”

    ({ label, error, isPassword, style, ...props }, ref) =>    
    a. { label, error, isPassword, style, ...props } : This means:
      - Extract these specific props:
        - label
        - error
        - isPassword
        - style
      - Put everything else into props

    Examples of what goes into ...props:
     placeholder, value, keyboardType, onChangeText, returnKeyType, secureTextEntry

    b.  (ref) =>  This is the forwarded ref from parent.
          Later we do: <TextInput ref={ref} />

  Visual Flow (VERY IMPORTANT) : 
  Parent Screen
   |
   |  ref
   ↓
  <Input />
   |
   |  forwardRef
   ↓
  <TextInput />
                                                  */
const Input = forwardRef<TextInput, InputProps>(  
  ({ label, error, isPassword, style, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <View style={styles.wrapper}>
        {label && <Text style={styles.label}>{label}</Text>}

        <View
          style={[
            styles.inputContainer,
            focused && styles.focusedBorder,
            error && styles.errorBorder,
          ]}
        >
          <TextInput
            ref={ref}
            style={[styles.input, style]}
            placeholderTextColor={COLORS.placeholder}
            secureTextEntry={isPassword && !showPassword}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}
          />

          {isPassword && (
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.eye}>{showPassword ? '🙈' : '👁️'}</Text>
            </Pressable>
          )}
        </View>

        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  },
);

export default Input;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 16,
    alignItems: 'center'
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginBottom: 4,
    fontWeight:'bold',
    color: COLORS.text,
    marginStart: 30,
  },
  inputContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: COLORS.inputBackground,
  },
  focusedBorder: {
    borderColor: COLORS.borderFocus,
  },
  errorBorder: {
    borderColor: COLORS.error,
  },
  input: {
    flex: 1,
    height: 50,
    color: COLORS.text
  },
  eye: {
    fontSize: 18,
    marginLeft: 8,
  },
  error: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 4,
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
});

