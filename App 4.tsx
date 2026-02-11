/*
  Lesson 5: Keyboard Handling & Avoiding Overlap (React Native)
  Lesson 6: Reusable & Advanced Input Component (2026 Standard)
  Lesson 7: Form Validation & Error Handling
  Lesson 8 & 9: Keyboard Handling, Focus Flow & Accessibility (React Native 2026)
  Lesson 10 & 11: Auto-Scroll to Error + Smart Focus (Production Forms)
  Lesson 12: Professional Form UX & Accessibility
  Lesson 13: Async API Integration + Error Handling (React Native + TypeScript)
  Lesson 14 (Restarted): Production-Ready Async UX & API Architecture
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


/* Source:
   1. https://chatgpt.com/share/698ae71c-3750-8009-afdd-e9a06f7cae15
   2. https://chatgpt.com/share/698ae6cf-be4c-8009-b675-5142988e6dd4
*/
