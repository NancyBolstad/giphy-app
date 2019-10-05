import * as React from 'react';
import { storiesOf } from '@storybook/react';
import GiphyGallery from './';

const mockGif = {
  gifUrl:
    'https://media3.giphy.com/media/fkD36jhiqzJ9m/giphy.gif?cid=047e3d523fbd947adc0a6edb3ec7b09b6a19ed45dadeb9d8&rid=giphy.gif',
  gifText: 'old school yes GIF',
};

const mockIGallery = {
  gifsArray: [mockGif, mockGif, mockGif, mockGif, mockGif],
};

storiesOf('Component/Gallery', module).add('Basic usage', () => <GiphyGallery {...mockIGallery} />);
