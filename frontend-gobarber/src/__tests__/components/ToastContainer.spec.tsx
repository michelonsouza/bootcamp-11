import React from 'react';
import { uuid } from 'uuidv4';
import { ThemeProvider } from 'styled-components';

import { act } from 'react-dom/test-utils';
import { render, fireEvent, wait } from '../../utils/testUtils';
import { ToastProvider, ToastMessage } from '../../hooks/toast';
import dark from '../../styles/themes/dark';

import { ToastContainer } from '../../components';

const Wrapper: React.FC = ({ children }) => (
  <ThemeProvider theme={dark}>
    <ToastProvider>{children}</ToastProvider>
  </ThemeProvider>
);

describe('ToastContainer and Toast components', () => {
  it('should be able to create a toast in toast container', async () => {
    const id = uuid();
    const messages: ToastMessage[] = [
      {
        id,
        title: 'Test Message',
        description: 'Test Description',
        type: 'success',
      },
    ];

    const { getByText } = render(
      <ToastContainer messages={messages} timer={2000} />,
      {
        wrapper: Wrapper,
      },
    );

    const strongElement = getByText(messages[0].title);

    expect(strongElement).toBeTruthy();
  });

  it('should be able to close a toast in toast container', async () => {
    act(() => {
      jest.useFakeTimers();
      const id = uuid();
      const messages: ToastMessage[] = [
        {
          id,
          title: 'Test Message',
          description: 'Test Description',
          type: 'success',
        },
      ];

      const { getByTitle, getByText } = render(
        <ToastContainer messages={messages} timer={2000} />,
        {
          wrapper: Wrapper,
        },
      );

      const closeButtonElement = getByTitle('Fechar');
      const strongElement = getByText(messages[0].title);

      fireEvent.click(closeButtonElement);

      jest.runAllTimers();

      wait(() => {
        expect(strongElement).toBeFalsy();
      });
    });
  });

  it('should be able create toast without type', async () => {
    jest.useFakeTimers();

    const id = uuid();
    const messages: ToastMessage[] = [
      {
        id,
        title: 'Test Message',
        description: 'Test Description',
      },
    ];

    const { getByTestId } = render(
      <ToastContainer messages={messages} timer={2000} />,
      {
        wrapper: Wrapper,
      },
    );

    const toast = getByTestId('toast-test');
    jest.runAllTimers();

    expect(toast).toBeTruthy();
  });
});
