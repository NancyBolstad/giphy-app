import * as React from 'react';
import styled from 'styled-components';

interface IGalleryProps {
  gifsArray?: IGifProps[];
}

interface IGifProps {
  gifUrl?: string;
  gifText?: string;
}

const GalleryWrapper = styled.div`
  background-color: black;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 1%;
  width: 100vw;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 80px;
`;

const GifWrapper = styled.div`
  height: auto;
  margin-top: 30px;
  width: 98vw;
  position: relative;

  @media (min-width: 768px) {
    .div:first-child {
      width: 100%;
    }
    .div:nth-child(n + 2) {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      margin-right: 1%;
    }
    .div:last-child {
      margin-right: 0;
    }
  }
  @media (min-width: 992px) {
    &:nth-child(-n + 2) {
      -webkit-box-flex: 0;
      -ms-flex: none;
      flex: none;
      margin: 0;
      width: 49.5%;
    }
    &:first-child {
      margin-right: 1%;
    }
    &:nth-child(n + 3) {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      margin-right: 1%;
    }
    &:last-child {
      margin-right: 0;
    }
  }
`;

const Gif = styled.img`
  display: block;
  height: auto;
  width: 100%;
  max-height: 527px;

  &:hover {
    opacity: 0.3;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  -webkit-transition: 0.5s ease;
  -o-transition: 0.5s ease;
  transition: 0.5s ease;
  background-color: #2b98f0;

  ${GifWrapper}:hover & {
    opacity: 1;
  }
`;

const OverlayText = styled.div`
  color: #ffffff;
  font-size: 1.5em;
  font-weight: 900;
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
`;

export const GiphyGallery: React.FunctionComponent<IGalleryProps> = ({ gifsArray }) => {
  return (
    <GalleryWrapper>
      {gifsArray &&
        gifsArray.map((item, index) => {
          return (
            <GifWrapper key={index}>
              <Gif src={item.gifUrl} alt={item.gifText} />
              <Overlay>
                <OverlayText>
                  <h2> {item.gifText}</h2>
                </OverlayText>
              </Overlay>
            </GifWrapper>
          );
        })}
    </GalleryWrapper>
  );
};

export default GiphyGallery;
