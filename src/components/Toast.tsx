import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  message: string;
  type?: 'success' | 'error';
};

export default function Toast({ message, type = 'success' }: Props) {
  if (!message) return null;

  return (
    <View
      style={[styles.toast, type === 'error' ? styles.error : styles.success]}
    >
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    zIndex: 999,
  },
  success: {
    backgroundColor: 'green',
  },
  error: {
    backgroundColor: 'red',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
  },
});
