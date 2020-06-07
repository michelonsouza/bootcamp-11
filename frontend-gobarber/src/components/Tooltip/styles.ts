import styled, { css, keyframes } from 'styled-components';

interface ContainerProps {
  hovered?: boolean;
  leave?: boolean;
}

const slideUp = keyframes`
  from {
    visibility: hidden;
    opacity: 0;
    transform: translateX(-50%) translateY(-30px);
  }

  to {
    visibility: visible;
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    visibility: visible;
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  to {
    opacity: 0;
    transform: translateX(-50%) translateY(-30px);
  }
`;

export const Container = styled.div<ContainerProps>`
  position: relative;

  span {
    ${({ theme }) => css`
      background: ${theme.colors.orange};
      color: ${theme.colors.background};

      &::before {
        content: '';
        border-style: solid;
        border-color: ${theme.colors.orange} transparent;
        border-width: 6px 6px 0 6px;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
      }
    `}

    width: 160px;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: all 300ms ease;
    visibility: hidden;
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%) translateY(40px);

    ${({ hovered }) =>
      hovered &&
      css`
        animation: ${slideUp} 300ms ease forwards;
      `}

    ${({ leave }) =>
      leave &&
      css`
        animation: ${slideDown} 300ms ease forwards;
      `}
  }
`;
