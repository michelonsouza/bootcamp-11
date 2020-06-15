import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext } from 'styled-components';

import { SignIn, SignUp } from '../screens';

const {
  Navigator: StackNavigator,
  Screen: StackScreen,
} = createStackNavigator();

const AuthRoutes: React.FC = () => {
  const { colors } = useContext(ThemeContext);

  return (
    <StackNavigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <StackScreen name="SignIn" component={SignIn} />
      <StackScreen name="SignUp" component={SignUp} />
    </StackNavigator>
  );
};
export default AuthRoutes;
