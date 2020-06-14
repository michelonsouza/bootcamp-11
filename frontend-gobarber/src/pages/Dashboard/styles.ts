import styled, { keyframes, css } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

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

export const Header = styled.header`
  background: ${({ theme }) => theme.colors.mediumBlack};
  padding: 32px;
  transform: translateY(-50px);
  opacity: 0;
  animation: ${slideDown} 500ms ease forwards;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    border: 0;
    margin-left: auto;
    background: transparent;

    svg {
      color: ${({ theme }) => theme.colors.gray};
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: ${({ theme }) => theme.colors.white};
    }

    a {
      color: ${({ theme }) => theme.colors.orange};
      text-decoration: none;
      transition: opacity 200ms ease;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
  transform: translateY(50px);
  opacity: 0;
  animation: ${slideUp} 500ms ease forwards;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    ${({ theme }) => css`
      color: ${theme.colors.orange};

      span {
        display: flex;
        align-items: center;
      }

      span + span::before {
        content: '';
        width: 2px;
        height: 12px;
        background: ${theme.colors.orange};
        margin: 0 8px;
      }
    `}

    font-weight: 500;
    display: flex;
    align-items: center;
    margin-top: 8px;
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: ${({ theme }) => theme.colors.gray};
    font-size: 20px;
    font-weight: 400px;
  }

  div {
    ${({ theme }) => css`
      background: ${theme.colors.shape};
      border-radius: ${theme.metrics.baseRadius}px;

      &::before {
        content: '';
        position: absolute;
        height: 80%;
        width: 2px;
        background: ${theme.colors.orange};
        left: 0;
        top: 10%;
      }
    `}

    display: flex;
    align-items: center;
    padding: 16px 24px;
    position: relative;
    margin-top: 24px;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: ${({ theme }) => theme.colors.text};
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: ${({ theme }) => theme.colors.gray};

      svg {
        color: ${({ theme }) => theme.colors.orange};
        margin-right: 8px;
      }
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    background: ${({ theme }) => theme.colors.mediumBlack};
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    ${({ theme }) => css`
      background: ${theme.colors.shape};
      border-radius: 10px;
      color: ${theme.colors.text};
    `}
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside) {
    transition: all 200ms ease;

    &:hover {
      background: ${({ theme }) => shade(0.2, theme.colors.shape)};
    }
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: ${({ theme }) => theme.colors.grayHard} !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    ${({ theme }) => css`
      background: ${theme.colors.orange} !important;
      border-radius: 10px;
      color: ${theme.colors.inputs} !important;
    `}
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    ${({ theme }) => css`
      color: ${theme.colors.gray};
      border-bottom: 2px solid ${theme.colors.shape};
    `}

    font-size: 20px;
    line-height: 26px;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    color: ${({ theme }) => theme.colors.white};
    margin-left: auto;
    display: flex;
    align-items: center;
    width: 70px;

    svg {
      color: ${({ theme }) => theme.colors.orange};
      margin-right: 8px;
    }
  }

  div {
    ${({ theme }) => css`
      background: ${theme.colors.shape};
      border-radius: ${theme.metrics.baseRadius}px;
    `}

    flex: 1;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    position: relative;
    margin-left: 24px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      color: ${({ theme }) => theme.colors.text};
      margin-left: 24px;
      font-size: 20px;
    }
  }
`;

export const NoAppointments = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.shape};
    border-radius: ${theme.metrics.baseRadius}px;
  `}

  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 88px;

  h2 {
    color: ${({ theme }) => theme.colors.gray};
    text-transform: uppercase;
    font-weight: 500;
  }
`;
