import { css } from 'styled-components';
import { Font } from '../types/font';

function createFontStyles(font: Font) {
  return css`
    font-family: ${font.family};
    font-weight: ${font.weight};
    font-size: ${font.size}rem;
  `;
}

export default createFontStyles;
