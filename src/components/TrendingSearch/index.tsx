import * as React from 'react';
import styled from 'styled-components';
import { GIPHY_API_KEY } from '../../util/constants';
import { Root, GifObj } from '../../types/apiData';

interface ITrendingSearchProps {}

const ResultWrapper = styled.div``;

const Result = styled.li`
  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    padding-bottom: 20px;
  }
`;

const ResultName = styled.p`
  margin: 0;
`;

const ResultBody = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 1000px) {
    flex-direction: row;
  }
`;

const ResultInfo = styled.div`
  flex: 1;
  p {
    margin: 4px 0 0;
  }
  a {
    color: black;
  }
`;

const Status = styled.li`
  text-align: center;
`;

const Gif = styled.img`
  display: block;
  width: 100%;
`;

export const TrendingSearch: React.FunctionComponent<ITrendingSearchProps> = ({}) => {
  const [searchResult, setSearchResult] = React.useState<GifObj[]>([]);

  async function callApi() {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&rating=G&lang=en
    `;
    const result: Root = await (await fetch(url)).json();

    if (Array.isArray(result.data) && result.data.length > 0) {
      console.log(1111111);
      setSearchResult(result.data);
    } else {
      setSearchResult([]);
    }
  }

  callApi();

  return (
    <ResultWrapper>
      {searchResult &&
        searchResult.map(element => (
          <Result key={element.id}>
            <ResultBody>
              <ResultInfo>
                <Gif src={element.images.original.url}></Gif>>
              </ResultInfo>
            </ResultBody>
          </Result>
        ))}
    </ResultWrapper>
  );
};

export default TrendingSearch;
