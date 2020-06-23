import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';

import { Provider } from '../Dashboard';

interface CommonProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
}

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
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-family: ${theme.font.regular};
  `}

  font-size: 20px;
  margin-left: 16px;
`;

export const BackButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
`;

export const UserNoAvatar = styled.View`
  background: ${({ theme }) => theme.colors.background};
  width: 56px;
  height: 56px;
  border-radius: 28px;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.ScrollView``;

export const ProvidersListContainer = styled.View`
  height: 112px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px;
`;

export const ProviderContainer = styled(RectButton)<CommonProps>`
  ${({ theme, selected }) => css`
    background: ${theme.colors[selected ? 'orange' : 'shape']};
    border-radius: ${theme.metrics.baseRadius}px;
  `}

  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;
`;

export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const ProviderNoAvatar = styled.View`
  background: ${({ theme }) => theme.colors.background};
  width: 32px;
  height: 32px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`;

export const ProviderName = styled.Text<CommonProps>`
  color: ${({ theme, selected }) =>
    theme.colors[selected ? 'inputs' : 'white']};
  margin-left: 8px;
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-family: ${theme.font.medium};
  `}

  font-size: 24px;
  margin: 0 24px 24px;
`;

export const OpenDatePickerButton = styled(RectButton)`
  ${({ theme }) => css`
    background: ${theme.colors.orange};
    border-radius: ${theme.metrics.baseRadius}px;
  `}

  height: 46px;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`;

export const OpenDatePickerButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.inputs};
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
`;

export const Schedule = styled.View`
  padding: 24px 0 16px;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.gray};
    font-family: ${theme.font.medium};
  `}

  font-size: 18px;
  margin: 0 24px 12px;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const Hour = styled(RectButton)<HourProps>`
  ${({ theme, available, selected }) => css`
    background: ${theme.colors[selected ? 'orange' : 'shape']};
    border-radius: ${theme.metrics.baseRadius}px;
    opacity: ${available ? 1 : 0.3};
  `}

  padding: 12px;
  margin-right: 8px;
`;

export const HourText = styled.Text<HourTextProps>`
  color: ${({ theme, selected }) =>
    theme.colors[selected ? 'inputs' : 'white']};
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
`;

export const CreateAppointmentButton = styled(RectButton)`
  ${({ theme }) => css`
    background: ${theme.colors.orange};
    border-radius: ${theme.metrics.baseRadius}px;
  `}

  height: 50px;
  align-items: center;
  justify-content: center;
  margin: 0 24px 24px;
`;

export const CreateAppointmentButtonText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.inputs};
    font-family: ${theme.font.medium};
  `}

  font-size: 18px;
`;
