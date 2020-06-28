import React from 'react';
import { render, RenderResult, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import dark from '../styles/themes/dark';
import AppProvider from '../hooks';

const AllProviders: React.FC = ({ children }) => (
  <ThemeProvider theme={dark}>{children}</ThemeProvider>
);

const customRender = (
  ui: React.ReactElement<any>,
  options?: Omit<RenderOptions, 'queries'>,
): RenderResult => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
