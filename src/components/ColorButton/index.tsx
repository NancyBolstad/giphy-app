import React from 'react';
import styled from 'styled-components';
import theme from '../../util/theme';

const Container = styled.button`
  background-color: ${theme.light.searchBgColor};
  color: ${theme.light.color};
  font-size: 2rem;
`;

export interface IProps {
  color?: string;
  onClick?: (color: string) => void;
}
export default (props: IProps) => {
  return <Container>Hello</Container>;
};
