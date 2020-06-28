import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from 'react-native-testing-library';

// import { render } from '../../utils/test-utils';

import { SignIn } from '../../screens';
import dark from '../../styles/themes/dark';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useIsFocused: jest.fn(),
}));

describe('SignIn screen', () => {
  it('should contains email/password inputs', () => {
    const { getByPlaceholder } = render(
      <ThemeProvider theme={dark}>
        <SignIn />
      </ThemeProvider>,
    );

    expect(getByPlaceholder('E-mail')).toBeTruthy();
    expect(getByPlaceholder('Senha')).toBeTruthy();
  });
});
