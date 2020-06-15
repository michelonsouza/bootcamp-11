import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import dark from './styles/themes/dark';
import Routes from './routes';
import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <ThemeProvider theme={dark}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={dark.colors.background}
          />
          <View style={{ backgroundColor: dark.colors.background, flex: 1 }}>
            <Routes />
          </View>
        </ThemeProvider>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
