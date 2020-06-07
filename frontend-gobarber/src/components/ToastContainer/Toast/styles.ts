import styled, { css, keyframes } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type?: 'error' | 'warning' | 'info' | 'success';
  hasdescription: string;
}

interface ProgressProps {
  transition?: number;
}

const progress = keyframes`
  from {
    width: 100%;
  }

  to {
    width: 0;
  }
`;

const toastTypeVariations = {
  info: css`
    background: ${({ theme }) => theme.colors.info};
    color: #fff;
  `,
  success: css`
    background: ${({ theme }) => theme.colors.success};
    color: #fff;
  `,
  error: css`
    background: ${({ theme }) => theme.colors.red};
    color: #fff;
  `,
  warning: css`
    background: ${({ theme }) => theme.colors.warning};
    color: ${({ theme }) => theme.colors.background};
  `,
};

export const Container = styled(animated.div)<ContainerProps>`
  width: 100vw;
  max-width: 100vw;
  position: relative;
  padding: 16px 30px 16px 16px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  overflow: hidden;

  background: #ebf8ff;
  color: #3172b7;

  @media screen and (min-width: 768px) {
    width: 360px;
    max-width: 100%;
    border-radius: ${({ theme }) => theme.metrics.baseRadius}px;
  }

  & + div {
    margin-top: 8px;
  }

  ${({ type }) => toastTypeVariations[type || 'info']};

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 16px;
    opacity: 0.7;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${({ hasdescription }) =>
    hasdescription === 'false' &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;

export const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 8px;
`;

export const Progress = styled.div<ProgressProps>`
  background: rgba(255, 255, 255, 0.6);
  height: 100%;
  width: 100%;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;

  ${({ transition }) =>
    transition &&
    css`
      animation: ${progress} ${transition}ms linear forwards;
    `}
`;
