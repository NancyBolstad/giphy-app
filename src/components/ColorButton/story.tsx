import React from 'react';
import { storiesOf } from '@storybook/react';
import ColorButton from '.';

storiesOf('Component/ColorButton', module)
  .add('red', () => <ColorButton color="red" />)
  .add('blue', () => <ColorButton color="blue" />);
