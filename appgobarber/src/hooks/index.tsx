import React from 'react';
import { ThemeProvider } from 'styled-components';
import { View, StatusBar } from 'react-native';

import dark from '../styles/themes/dark';

import { AuthProvider } from './auth';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ThemeProvider theme={dark}>
      <View style={{ backgroundColor: dark.colors.background, flex: 1 }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={dark.colors.background}
          translucent
        />
        {children}
      </View>
    </ThemeProvider>
  </AuthProvider>
);

export default AppProvider;
