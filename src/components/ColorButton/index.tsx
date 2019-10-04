import React from 'react';
import styled from 'styled-components';

const Container = styled.button`
  background-color: red;
  color: white;
  font-size: 2rem;
`;

export interface IProps {
  color?: string;
  onClick?: (color: string) => void;
}
export default (props: IProps) => {
  return <Container>Hello</Container>;
};
