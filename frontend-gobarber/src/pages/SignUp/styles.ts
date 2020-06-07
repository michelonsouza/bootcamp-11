import styled, { css, keyframes } from 'styled-components';
import { shade } from 'polished';

import signUpBackground from '../../assets/sign-up-background.png';

const apearFronLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const apearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${apearFromRight} 800ms ease forwards;

  form {
    margin: 80px 0;
    width: 340px;
    max-width: 100%;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      ${({ theme }) => css`
        color: ${theme.colors.white};

        &:hover {
          color: ${shade(0.2, theme.colors.white)};
        }
      `}

      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: all 200ms ease;
    }
  }

  > a {
    ${({ theme }) => css`
      color: ${theme.colors.orange};

      &:hover {
        color: ${shade(0.2, theme.colors.orange)};
      }
    `}

    display: flex;
    align-items: center;
    margin-top: 24px;
    text-decoration: none;
    transition: all 200ms ease;

    svg {
      margin-right: 16px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackground}) no-repeat center;
  background-size: cover;
  animation: ${apearFronLeft} 800ms ease forwards;
`;
