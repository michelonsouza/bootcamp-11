import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';
import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
