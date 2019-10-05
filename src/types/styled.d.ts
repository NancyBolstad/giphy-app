import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    sizes: {
      header: string;
      borderRadius: {
        normal: string;
        large: string;
      };
    };
    colors: {
      primaryText: string;
      contentText: string;
      dimText: string;
      profile: string;
      background: string;
      sidebar: string;
      header: string;
      contentBackground: string;
      border: string;
      warning: string;
      good: string;
      neutral: string;
    };
    spacing: {
      small: string;
      normal: string;
      large: string;
    };
    animation: {
      timing: {
        normal: string;
      };
      easing: {
        inOut: string;
      };
    };
  }
}
