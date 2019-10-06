import * as React from 'react';
import styled from 'styled-components';
import Columned from 'react-columned';
import { GIPHY_API_KEY } from '../../util/constants';
import { Root, GifObj } from '../../types/apiData';
import searchImages from '../../util/searchImages';

interface ITrendingSearchProps {}

const Gif = styled.img`
  display: block;
  width: 100%;
  margin: 0.3rem;
`;

export const TrendingSearch: React.FunctionComponent<ITrendingSearchProps> = () => {
  const [searchResult, setSearchResult] = React.useState<GifObj[]>([]);

  async function callApi() {
    const trendingImages = await searchImages('', 200);
    const { data } = trendingImages;

    if (Array.isArray(data) && data.length > 0) {
      setSearchResult(data);
    } else {
      setSearchResult([]);
    }
  }

  callApi();

  return (
    <Columned>
      {searchResult &&
        searchResult.map(element => (
          <Gif src={element.images.downsized.url} alt={element.title}></Gif>
        ))}
    </Columned>
  );
};

export default TrendingSearch;
