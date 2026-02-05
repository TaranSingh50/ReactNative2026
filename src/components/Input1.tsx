import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { COLORS } from "../theme/colors";

type InputProps = TextInputProps; /* Instead of manually listing every possible 
                                     TextInput prop, we extend React Native’s 
                                     built-in type. */

export default function Input(props: InputProps) {
    return (
        <TextInput
            placeholderTextColor={COLORS.placeholder}
            style={styles.input}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: COLORS.text,
    backgroundColor: '#fff',
  },
});