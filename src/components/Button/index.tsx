import styled, { css } from 'styled-components';

interface Props {
  variant?: 'submit' | 'loadMore';
  buttonColor?: 'red' | 'transparent';
}

const Button = styled.a<Props>`
  display: table-cell;
  text-decoration: none;
  cursor: pointer;
  color: white;
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
      border: 2px solid white;
      background-color: black;
      color: white;
      width: 20rem;

      &:hover {
        background: Thistle;
        transition: background 400ms ease-in-out;
        border: none;
      }
    `};
`;

const DumbButton = Button.withComponent('button');

export default Button;
export { DumbButton };
