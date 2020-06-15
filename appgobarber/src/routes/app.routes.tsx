import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext } from 'styled-components';

import { Dashboard } from '../screens';

const { Navigator: AppNavigator, Screen: AppScreen } = createStackNavigator();

const AppRoutes: React.FC = () => {
  const { colors } = useContext(ThemeContext);

  return (
    <AppNavigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <AppScreen name="Dashboard" component={Dashboard} />
    </AppNavigator>
  );
};

export default AppRoutes;
