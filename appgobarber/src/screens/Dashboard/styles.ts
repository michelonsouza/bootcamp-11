import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';

import { Provider } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  background: ${({ theme }) => theme.colors.mediumBlack};
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.orange};
  font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px 16px;
`;

export const ProvidersListTitle = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 24px;
  margin-bottom: 24px;
  font-family: 'RobotoSlab-Medium';
`;

export const ProviderContainer = styled(RectButton)`
  ${({ theme }) => css`
    background: ${theme.colors.shape};
    border-radius: ${theme.metrics.baseRadius}px;
  `}

  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const ProviderAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const ProviderNoAvatar = styled.View`
  background: ${({ theme }) => theme.colors.background};
  width: 72px;
  height: 72px;
  border-radius: 36px;
  justify-content: center;
  align-items: center;
`;

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderName = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
`;

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const ProviderMetaText = styled.Text`
  color: ${({ theme }) => theme.colors.gray};
  margin-left: 8px;
  font-family: 'RobotoSlab-Regular';
`;
