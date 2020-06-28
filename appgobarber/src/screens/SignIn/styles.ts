import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 166 : 50}px;
  /* padding: 0 30px 50px; */
`;

export const Title = styled.Text`
  color: ${({ theme }) => {
    return theme.colors.white;
  }};
  font-size: 24px;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  ${({ theme }) => css`
    background: ${theme.colors.background};
    border-color: ${theme.colors.inputs};
  `}

  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  border-top-width: 1px;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CreateAccountButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.orange};
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;
