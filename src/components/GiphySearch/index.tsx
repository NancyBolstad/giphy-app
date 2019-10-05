import * as React from 'react';
import styled from 'styled-components';
import Columned from 'react-columned';
import { GIPHY_API_KEY } from '../../util/constants';
import { Root, GifObj } from '../../types/apiData';
import { TrendingSearch } from '../TrendingSearch';

interface ISearchProps {}

const SearchSectionWrapper = styled.div`
  display: flex;
  background-color: black;
  color: white;
  flex-direction: column;
  width: 75vw;
  margin: 0 auto;
`;

const GeoSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  background-color: black;
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

const SearchFormWrapper = styled.div`
  margin: 0 auto;
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-bottom: 15px;
  }

  button[type='submit'] {
    border: 1px solid #aaa;
    background-color: #aaa;
    color: #fff;
    padding: 0 12px;
    height: 50px;
    width:10vw;
  }

  input[type='text'] {
    border: 2px solid #aaa;
    color: #333;
    font-size: 14px;
    height: 40px;
    width: 40vw;
	max-width: 100%;
    }
  }

  button[type='submit']:focus {
    outline: none;
  }
  button[type='submit']:active {
    opacity: 0.7;
  }
`;

const ResultWrapper = styled.ul`
  padding: 30px;
  margin: 2px 0 0;
  list-style: none;

  li {
    &:not(:last-child) {
      margin-bottom: 50px;
    }
  }
`;

const Status = styled.li`
  text-align: center;
`;

const Gif = styled.img`
  display: block;
  width: 100%;
  margin: 0.3rem;
`;

export const GiphySearch: React.FunctionComponent<ISearchProps> = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasSearched, setHasSearched] = React.useState(false);
  const [didntFind, setDidntFind] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState<GifObj[]>([]);
  const [amount, setAmount] = React.useState(0);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearchResult([]);
    setHasSearched(true);
    setIsLoading(true);
    setDidntFind(false);
    callApi(searchValue);
  };

  async function callApi(query: string) {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchValue}&rating=G&lang=en
    `;
    const result: Root = await (await fetch(url)).json();

    if (Array.isArray(result.data) && result.data.length > 0) {
      console.log(1111111);
      console.log(result.pagination.total_count);
      setAmount(result.pagination.total_count);
      setSearchResult(result.data);
    } else {
      setSearchResult([]);
      setDidntFind(true);
    }

    setIsLoading(false);
  }

  return (
    <SearchSectionWrapper>
      <GeoSearchWrapper>
        <SearchFormWrapper>
          <form onSubmit={handleSubmit}>
            <input
              id="searchForm"
              className="searchInput"
              type="text"
              placeholder="Search her"
              value={searchValue}
              onChange={(e: any) => {
                setSearchValue(e.target.value);
              }}
            />
            <button type="submit" aria-label="Søk etter gif">
              Search
            </button>
          </form>
        </SearchFormWrapper>
      </GeoSearchWrapper>
      {!hasSearched && <TrendingSearch></TrendingSearch>}
      {hasSearched && (
        <ResultWrapper>
          {isLoading && <Status>Laster…</Status>}
          {didntFind && <Status>{`Fant ingen ${searchValue}!`}</Status>}
          {!didntFind && <Status>{`Found ${amount} gifs`}</Status>}
          {searchResult && (
            <Columned>
              {searchResult.map(element => (
                <Gif src={element.images.original.url} alt={element.title}></Gif>
              ))}
            </Columned>
          )}
        </ResultWrapper>
      )}
    </SearchSectionWrapper>
  );
};

export default GiphySearch;
