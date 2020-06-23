import { RectButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-family: ${theme.font.medium};
  `}

  font-size: 32px;
  text-align: center;
  margin-top: 48px;
`;

export const Description = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.gray};
    font-family: ${theme.font.regular};
  `}

  font-size: 18px;
  margin-top: 16px;
`;

export const OkButton = styled(RectButton)`
  ${({ theme }) => css`
    background: ${theme.colors.orange};
    border-radius: ${theme.metrics.baseRadius}px;
    height: ${theme.metrics.baseHeight}px;
  `}

  justify-content: center;
  align-items: center;
  margin-top: 24px;
  padding: 12px 24px;
`;

export const OkButtonText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.inputs};
    font-family: ${theme.font.medium};
  `}

  font-size: 18px;
`;
