import * as React from 'react';
import styled from 'styled-components';
import Columned from 'react-columned';
import { GIPHY_API_KEY } from '../../util/constants';
import { Root, GifObj } from '../../types/apiData';

interface ITrendingSearchProps {}

const Gif = styled.img`
  display: block;
  width: 100%;
  margin: 0.3rem;
`;

export const TrendingSearch: React.FunctionComponent<ITrendingSearchProps> = () => {
  const [searchResult, setSearchResult] = React.useState<GifObj[]>([]);

  async function callApi() {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&rating=G&lang=en
    `;
    const result: Root = await (await fetch(url)).json();

    if (Array.isArray(result.data) && result.data.length > 0) {
      setSearchResult(result.data);
    } else {
      setSearchResult([]);
    }
  }

  callApi();

  return (
    <Columned>
      {searchResult &&
        searchResult.map(element => (
          <Gif src={element.images.downsized_medium.url} alt={element.title}></Gif>
        ))}
    </Columned>
  );
};

export default TrendingSearch;
