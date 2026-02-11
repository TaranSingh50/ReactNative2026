/*
  Lesson 15: API State Management
  Lesson 16: Retry Logic (Advanced)
  Lesson 17: API Cancellation (check file App3.tsx)
*/

import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from './src/theme/colors';
import LoginScreen from './src/screens/LoginScreen';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <LoginScreen />
        <Toast />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


/* Source:
   1. https://chatgpt.com/share/698ae71c-3750-8009-afdd-e9a06f7cae15
   2. https://chatgpt.com/share/698ae6cf-be4c-8009-b675-5142988e6dd4
*/
