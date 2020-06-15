import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Animated } from 'react-native';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  ${({ theme }) => css`
    height: ${theme.metrics.baseHeight}px;
    background: ${theme.colors.inputs};
    border-radius: ${theme.metrics.baseRadius}px;
    border: 2px solid ${theme.colors.inputs};
  `}

  width: 100%;
  padding: 0 16px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  position: relative;

  ${({ theme, isErrored }) =>
    isErrored &&
    css`
      border-color: ${theme.colors.red};
      margin-bottom: 16px;
    `}

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-color: ${theme.colors.orange};
      margin-bottom: 8px;
    `}
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;

export const TextInput = styled.TextInput`
  color: ${({ theme }) => theme.colors.white};
  flex: 1;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const Error = styled(Animated.View)`
  background: ${({ theme }) => theme.colors.red};
  height: 24px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  position: absolute;
  bottom: -24px;
  width: 80%;
  left: 15%;
  opacity: 0;
`;

export const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
`;
