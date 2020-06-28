import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { ThemeProvider } from 'styled-components';
import * as uuidv4 from 'uuidv4';

import { useToast, ToastProvider } from '../../hooks/toast';
import dark from '../../styles/themes/dark';

const wrapper: React.FC = ({ children }) => (
  <ThemeProvider theme={dark}>
    <ToastProvider>{children}</ToastProvider>
  </ThemeProvider>
);

describe('Toast hook', () => {
  it('should be able to add toast', () => {
    const uuidSpy = jest.spyOn(uuidv4, 'uuid');

    const { result } = renderHook(() => useToast(), {
      wrapper,
    });

    act(() => {
      result.current.addToast({
        type: 'success',
        title: 'Simple toast',
        description: 'simple toast test',
      });
    });

    expect(uuidSpy).toBeCalledTimes(1);
  });

  it('should be able to remove toast', () => {
    const uuidSpy = jest
      .spyOn(uuidv4, 'uuid')
      .mockImplementation(() => 'fake-uuid');

    const { result } = renderHook(() => useToast(), {
      wrapper,
    });

    act(() => {
      result.current.addToast({
        type: 'success',
        title: 'Simple toast',
        description: 'simple toast test',
      });

      result.current.removeToast('fake-uuid');
    });

    expect(uuidSpy).toHaveReturnedWith('fake-uuid');
  });
});
