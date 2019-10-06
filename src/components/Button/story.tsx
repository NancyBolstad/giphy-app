import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { DumbButton } from './';

storiesOf('Component/Button', module).add('Basic usage', () => (
  <DumbButton variant="loadMore">Load More</DumbButton>
));
