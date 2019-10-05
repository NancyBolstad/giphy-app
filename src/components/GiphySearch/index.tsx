import * as React from 'react';
import styled from 'styled-components';
import { GIPHY_API_KEY } from '../../util/constants';

interface ISearchProps {
  errorBorder?: boolean;
}

export interface SearchResultInterface {
  id: string;
}

const SearchSectionWrapper = styled.div``;

const GeoSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

interface SearchFormWrapper {
  border?: boolean;
}

const SearchFormWrapper = styled.div<SearchFormWrapper>`
background-color: white;
  border: 2px solid transparent;

  form {
    display: flex;
    margin: 0;
    padding: 0;
    position: relative;
    padding: 1rem;
  }
  button[type='submit'] {
    cursor: pointer;
    height: 3rem;
    background-color: white;
    color: #777777;
    border: none;
    position: absolute;
    right: 12px;
    top: 16px;
  }
  input[type='text'] {
    border: none;
    border-bottom: 2px solid #777777;
    background-color: green
    color: #454545;
    display: block;
    flex: 1;
    height: 1.8em;
    padding-right: 50px;
    ::placeholder {
      color: black;
    }
  }
  input[type='text']:focus,
  button[type='submit']:focus {
    outline: none;
  }
`;

const ResultWrapper = styled.ul`
  max-height: 500px;
  overflow-y: auto;
  background-color: white;
  padding: 30px;
  margin: 2px 0 0;
  list-style: none;
  box-shadow: inset 0 -14px 10px -10px #00000029;
  li {
    &:not(:last-child) {
      margin-bottom: 50px;
    }
  }
`;

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

export const GiphySearch: React.FunctionComponent<ISearchProps> = ({ errorBorder }) => {
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasSearched, setHasSearched] = React.useState(false);
  const [didntFind, setDidntFind] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState<SearchResultInterface[]>([]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearchResult([]);
    setHasSearched(true);
    setIsLoading(true);
    setDidntFind(false);
    callApi(searchValue);
  };

  async function callApi(query: string) {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchValue}&limit=25&offset=0&rating=G&lang=en
    `;
    const result = await (await fetch(url)).json();

    if (Array.isArray(result.data) && result.data.length > 0) {
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
              placeholder="Skriv inn sted"
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
      {hasSearched && (
        <ResultWrapper>
          {isLoading && <Status>Laster…</Status>}
          {didntFind && <Status>{`Fant ingen ${searchValue}!`}</Status>}
          {searchResult &&
            searchResult.map(element => (
              <Result key={element.id}>
                <ResultBody>
                  <ResultInfo>
                    <ResultName>{element.id}</ResultName>
                  </ResultInfo>
                </ResultBody>
              </Result>
            ))}
        </ResultWrapper>
      )}
    </SearchSectionWrapper>
  );
};

export default GiphySearch;
