import styled, { css } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  ${({ theme }) => css`
    background: ${theme.colors.orange};
    color: ${theme.colors.background};
    border-radius: ${theme.metrics.baseRadius}px;

    &:hover {
      background: ${shade(0.2, theme.colors.orange)};
    }
  `}

  height: 56px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: all 300ms ease;
  display: flex;
  justify-content: center;
  align-items: center;
`;
