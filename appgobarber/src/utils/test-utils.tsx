// eslint-disable-next-line import/no-extraneous-dependencies
import 'jest-styled-components';
import React from 'react';
import { View } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, RenderAPI, RenderOptions } from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components/native';

import { AuthProvider } from '../hooks/auth';
import dark from '../styles/themes/dark';

const AllProviders: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider theme={dark}>
        <View style={{ backgroundColor: dark.colors.background, flex: 1 }}>
          {children}
        </View>
      </ThemeProvider>
    </AuthProvider>
  );
};

const customRender = (
  component: React.ReactElement<any>,
  options?: RenderOptions,
): RenderAPI => {
  return render(component, { wrapper: AllProviders, ...options });
};

// eslint-disable-next-line import/no-extraneous-dependencies
export * from 'react-native-testing-library';
export { customRender as render };
