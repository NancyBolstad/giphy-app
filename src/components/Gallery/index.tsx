import * as React from 'react';
import styled from 'styled-components';
import Columned from 'react-columned';

interface IGalleryProps {
  gifsArray?: IGifProps[];
}

interface IGifProps {
  gifUrl?: string;
  gifText?: string;
}

const Gif = styled.img`
  display: block;
  width: '100%';
`;

export const GiphyGallery: React.FunctionComponent<IGalleryProps> = ({ gifsArray }) => {
  return (
    <Columned>
      {gifsArray &&
        gifsArray.map((item, index) => {
          return <Gif src={item.gifUrl} alt={item.gifText} />;
        })}
    </Columned>
  );
};

export default GiphyGallery;
