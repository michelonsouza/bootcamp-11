import React, { ButtonHTMLAttributes, useContext } from 'react';
import Spinner from 'react-spinner-material';
import { ThemeContext } from 'styled-components';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => {
  const { colors } = useContext(ThemeContext);

  return (
    <Container {...rest}>
      {loading ? (
        <Spinner radius={34} stroke={5} color={colors.background} visible />
      ) : (
        children
      )}
    </Container>
  );
};

export default Button;
