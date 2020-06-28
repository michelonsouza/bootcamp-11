import React from 'react';

import { render } from '../../utils/testUtils';
import { Button } from '../../components';

describe('Button component', () => {
  it('should be able render spinner', () => {
    const { getByText } = render(<Button>Test Button</Button>);

    const buttonElement = getByText('Test Button');

    expect(buttonElement).toBeTruthy();
  });

  it('should be able render spinner', () => {
    const { getByTestId } = render(<Button loading>Test Button</Button>);

    const spinnerElement = getByTestId('button-spinner');

    expect(spinnerElement).toBeTruthy();
  });
});
