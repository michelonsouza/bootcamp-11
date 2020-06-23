import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 166 : 50}px;
  position: relative;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 40px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-family: ${theme.font.medium};
  `}

  font-size: 20px;
  margin: 24px 0;
`;

export const UserNoAvatar = styled.View`
  background: ${({ theme }) => theme.colors.inputs};
  width: 186px;
  height: 186px;
  border-radius: 98px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`;
