import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  ${({ theme, isFilled, isErrored }) => css`
    background: ${theme.colors.inputs};
    border: 2px solid ${isErrored ? theme.colors.red : theme.colors.inputs};
    height: ${theme.metrics.baseHeight}px;
    color: ${isFilled ? theme.colors.orange : theme.colors.grayHard};
    border-radius: ${theme.metrics.baseRadius}px;

    &:focus-within {
      color: ${theme.colors.orange};
      border-color: ${theme.colors.orange};
    }
  `}

  display: flex;
  align-items: center;
  padding: 0 16px;
  width: 100%;
  transition: all 200ms ease;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    border: 0;
    height: 100%;
    background: transparent;

    ${({ theme }) => css`
      color: ${theme.colors.white};

      &::placeholder {
        color: ${theme.colors.grayHard};
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-appearance: none !important;
        background: ${theme.colors.inputs} !important;
        -webkit-box-shadow: 0 0 0 30px ${theme.colors.inputs} inset !important;
        box-shadow: 0 0 0 30px ${theme.colors.inputs} inset !important;
        -webkit-text-fill-color: ${theme.colors.text} !important;
        color: ${theme.colors.text} !important;
      }
    `}
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    ${({ theme }) => css`
      background: ${theme.colors.red};
      color: ${theme.colors.text};

      &::before {
        border-color: ${theme.colors.red} transparent;
      }
    `}
  }
`;
