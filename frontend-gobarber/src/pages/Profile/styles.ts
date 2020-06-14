import styled, { css, keyframes } from 'styled-components';
import { shade } from 'polished';

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  height: 100vh;

  header {
    background: ${({ theme }) => theme.colors.mediumBlack};
    height: 144px;
    opacity: 0;
    transform: translateY(-50px);
    animation: ${slideDown} 800ms ease forwards;
    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: ${({ theme }) => theme.colors.gray};
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;
  margin: -93px auto 0;
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${slideUp} 800ms ease forwards;

  form {
    /* margin: 80px 0; */
    width: 340px;
    max-width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
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
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    background: ${({ theme }) => theme.colors.orange};
    border: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    position: absolute;
    right: 0;
    bottom: 0;
    transition: all 200ms ease;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    > input {
      display: none;
    }

    &:hover {
      background: ${({ theme }) => shade(0.2, theme.colors.orange)};
    }

    svg {
      width: 24px;
      height: 24px;

      color: ${({ theme }) => theme.colors.mediumBlack};
    }
  }
`;

export const ImagePlaceholder = styled.div`
  background: ${({ theme }) => theme.colors.shape};
  width: 186px;
  height: 186px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  svg {
    width: 124px;
    height: 124px;
    color: ${({ theme }) => theme.colors.mediumBlack};
  }

  &::after {
    content: '';
    width: 196px;
    height: 196px;
    border-radius: 50%;
    border: 4px solid ${({ theme }) => theme.colors.shape};
    position: absolute;
    top: -9px;
    left: -9px;
  }
`;
