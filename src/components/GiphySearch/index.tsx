import * as React from 'react';
import styled from 'styled-components';
import Columned from 'react-columned';
import TrendingSearch from '../TrendingSearch';
import { GifObj } from '../../types/apiData';
import giphyService from '../../util/giphyService';
import { PAGE_SIZE } from '../../util/constants';
import { searchIcon } from '../../util/icons';
import { DumbButton } from '../Button';

interface ISearchProps {}

const SearchSectionWrapper = styled.div`
  display: flex;
  background-color: black;
  color: white;
  flex-direction: column;
  width: 85vw;
  margin: 0 auto;

  h1 {
    margin: 2rem auto;
    font-size: 2.2rem;
  }
`;

const SearchBlockWrapper = styled.div`
  padding-bottom: 3rem;
  width: 80vw;
  margin: 0 auto;
`;

const SearchFormWrapper = styled.div`
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 auto;
    width: 80vw;

    @media screen and (min-width: 768px) {
      flex-direction: row;
      width: auto;
    }
  }

  input[type='text'] {
    border: none;
    background: #e9e9e9;
    white-space: nowrap;
    padding: 0.55rem 0.75rem;
    border: none;
    font-size: 1.1em;
    text-decoration: none;
    line-height: normal;
    height: 2rem;
    flex-grow: 1;
    width: 40vw;
  }

  button[type='submit'] {
    background-color: #09ebaf;
    color: black;
    border: none;
    cursor: pointer;
    flex-grow: 1;
    width: 10vw;

    svg {
      height: 1.1rem;
      width: 1.1rem;
      fill: white;
    }
  }

  input[type='text']:focus {
    background: white;
    outline: none;
  }

  button[type='submit']:focus {
    outline: none;
  }
  button[type='submit']:hover {
    opacity: 0.7;
  }
`;

const ResultWrapper = styled.div`
  padding: 30px;
`;

const Status = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2rem;
  font-weight: bold;
`;

const Gif = styled.img`
  display: block;
  width: 100%;
  margin: 0.3rem;
`;

export const GiphySearch: React.FunctionComponent<ISearchProps> = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [didntFind, setDidntFind] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [hasSearched, setHasSearched] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState<GifObj[]>([]);
  const [moreContent, setMoreContent] = React.useState(false);
  const [paginationPosition, setPaginationPosition] = React.useState(0);

  const handleSearchSubmit = async (e: any) => {
    e.preventDefault();
    setHasSearched(true);
    setSearchResult([]);
    setIsLoading(true);
    searchImages();
  };

  async function searchImages() {
    const finding = await giphyService({
      searchEndpoint: 'search',
      searchTerm: searchValue,
      offset: paginationPosition,
    });
    const { data, pagination } = finding;

    if (Array.isArray(data) && data.length > 0) {
      setSearchResult(data);
      setHasSearched(true);
      setDidntFind(false);
      setTotal(pagination.total_count);
      setPaginationPosition(paginationPosition + PAGE_SIZE);
    } else {
      setDidntFind(true);
      setSearchResult([]);
    }

    if (searchResult.length < pagination.total_count) {
      setMoreContent(true);
    }

    setIsLoading(false);
  }

  async function getMoreImages() {
    const newImages = await giphyService({
      searchEndpoint: 'search',
      searchTerm: searchValue,
      offset: paginationPosition,
    });
    const { data, pagination } = newImages;

    if (newImages.data.length > 0) {
      setHasSearched(true);
      setSearchResult([...searchResult, ...data]);
      setPaginationPosition(paginationPosition + PAGE_SIZE);
    } else {
      setDidntFind(true);
      setMoreContent(false);
      setSearchResult([]);
    }

    if (searchResult.length < pagination.total_count) {
      setMoreContent(true);
    }

    setIsLoading(false);
  }

  return (
    <SearchSectionWrapper>
      <h1>Giphy Search</h1>
      <SearchBlockWrapper>
        <SearchFormWrapper>
          <form onSubmit={handleSearchSubmit}>
            <input
              id="searchForm"
              className="searchInput"
              type="text"
              aria-label="Search gif"
              placeholder="Search for gifs"
              value={searchValue}
              onChange={(e: any) => {
                setSearchValue(e.target.value);
              }}
            />
            <button type="submit" aria-label="Search for gifs">
              {searchIcon}
            </button>
          </form>
        </SearchFormWrapper>
      </SearchBlockWrapper>
      {!hasSearched && <TrendingSearch></TrendingSearch>}
      {hasSearched && (
        <ResultWrapper>
          {isLoading && <Status>Louding…</Status>}
          {didntFind && <Status>{`No results for ${searchValue}`}</Status>}
          {!didntFind && <Status>{`Found ${total} gifts!`}</Status>}
          {searchResult && (
            <Columned>
              {searchResult.map(element => (
                <Gif src={element.images.downsized.url} alt={element.title}></Gif>
              ))}
            </Columned>
          )}
        </ResultWrapper>
      )}
      {moreContent && !didntFind && (
        <DumbButton variant="loadMore" onClick={getMoreImages} title="Load more images">
          Load More
        </DumbButton>
      )}
    </SearchSectionWrapper>
  );
};

export default GiphySearch;
