import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext } from 'styled-components';

import { SignIn, SignUp } from '../screens';

const { Navigator: AuthNavigator, Screen: AuthScreen } = createStackNavigator();

const AuthRoutes: React.FC = () => {
  const { colors } = useContext(ThemeContext);

  return (
    <AuthNavigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <AuthScreen name="SignIn" component={SignIn} />
      <AuthScreen name="SignUp" component={SignUp} />
    </AuthNavigator>
  );
};
export default AuthRoutes;
