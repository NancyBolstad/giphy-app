import styled, { css } from 'styled-components';

interface Props {
  variant?: 'submit' | 'loadMore';
  buttonColor?: 'red' | 'transparent';
}

const Button = styled.a<Props>`
  display: table-cell;
  text-decoration: none;
  cursor: pointer;
  color: #ffffff;
  text-align: center;
  vertical-align: middle;
  text-transform: capitalize;
  font-weight: bold;
  margin: 2rem auto;

  ${props =>
    props.variant === 'loadMore' &&
    css`
      height: 3.35rem;
      font-size: 1.5rem;
      border: 2px solid #ffffff;
      background-color: black;
      color: #ffffff;
      width: 12rem;

      &:hover {
        background: #09ebaf;
        transition: background 400ms ease-in-out;
        border: none;
        color: black;
      }

      &:active {
        opacity: 0.7;
        box-shadow: none;
      }
    `};

  &:focus {
    outline: none;
  }
`;

const DumbButton = Button.withComponent('button');

export default Button;
export { DumbButton };
