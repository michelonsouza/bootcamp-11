import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import dark from './styles/themes/dark';
import GlobalStyle from './styles/global';
import Routes from './routes';

import AppProvider from './hooks';

const App: React.FC = () => (
  <ThemeProvider theme={dark}>
    <AppProvider>
      <GlobalStyle />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AppProvider>
  </ThemeProvider>
);

export default App;
