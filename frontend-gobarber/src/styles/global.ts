import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    ${({ theme }) => css`
      background: ${theme.colors.background};
      color: ${theme.colors.text};
    `}

    -webkit-font-smoothing: antialiased !important;
    overflow-x: hidden;
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong, b {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  button, input, select, textarea, a {
    -webkit-tap-highlight-color: transparent;
  }
`;
