import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  ${({ theme }) => css`
    height: ${theme.metrics.baseHeight}px;
    background: ${theme.colors.orange};
    border-radius: ${theme.metrics.baseRadius}px;
  `}

  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 8px;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.background};
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
`;
