/*
  Lesson 5 : Keyboard Handling & Avoiding Overlap (React Native)
  Lesson 6 : Reusable & Advanced Input Component (2026 Standard)
*/

import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from './src/theme/colors';
import RegisterScreen from './src/screens/RegisterScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <RegisterScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
