import * as React from 'react';
import styled from 'styled-components';
import Columned from 'react-columned';
import { Root, GifObj } from '../../types/apiData';
import giphyService from '../../util/giphyService';

interface ITrendingSearchProps {}

const Gif = styled.img`
  display: block;
  width: 100%;
  margin: 0.3rem;
`;

export const TrendingSearch: React.FunctionComponent<ITrendingSearchProps> = () => {
  const [trendingImages, setTrendingImages] = React.useState<GifObj[]>([]);

  async function useGiphyService() {
    const giphyResponse: Root = await giphyService({});

    console.log(11111);

    if (Array.isArray(giphyResponse.data) && giphyResponse.data.length > 0) {
      setTrendingImages(giphyResponse.data);
    } else {
      setTrendingImages([]);
    }
  }

  useGiphyService();

  return (
    <Columned>
      {trendingImages &&
        trendingImages.map(element => (
          <Gif src={element.images.downsized.url} alt={element.title}></Gif>
        ))}
    </Columned>
  );
};

export default TrendingSearch;
