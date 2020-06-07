import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    colors: {
      orange: string;
      red: string;
      white: string;
      gray: string;
      grayHard: string;
      shape: string;
      mediumBlack: string;
      background: string;
      inputs: string;
      text: string;
      info: string;
      success: string;
      warning: string;
    };
    metrics: {
      baseHeight: number;
      baseRadius: number;
    };
  }
}
