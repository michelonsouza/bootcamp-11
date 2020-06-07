import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 0;
  overflow: hidden;
  z-index: 100;

  @media screen and (min-width: 768px) {
    padding: 30px;
  }
`;
