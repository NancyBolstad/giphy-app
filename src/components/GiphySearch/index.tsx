import * as React from 'react';
import styled from 'styled-components';
import Columned from 'react-columned';
import { GifObj } from '../../types/apiData';
import { TrendingSearch } from '../TrendingSearch';
import searchImages from '../../util/searchImages';
import { PAGE_SIZE } from '../../util/constants';
import { searchIcon } from '../../util/icons';
import { DumbButton } from '../Button';

interface ISearchProps {}

const SearchSectionWrapper = styled.div`
  display: flex;
  background-color: black;
  color: white;
  flex-direction: column;
  width: 75vw;
  margin: 0 auto;
`;

const SearchBlockWrapper = styled.div`
  display: flex;
  background-color: white;
  background-color: black;
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

const SearchFormWrapper = styled.div`
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
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
    padding: 0.35em 0.75em;
    border: none;
    font-size: 1.1em;
    text-decoration: none;
    line-height: normal;
    height: 2rem;
    flex-grow: 1;

    @media screen and (min-width: 768px) {
      flex-grow: 0;
      width: 40vw;
    }
  }

  button[type='submit'] {
    height: 2.35rem;
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: capitalize;
    background: red;
    color: white;
    border: none;
    cursor: pointer;
    flex-grow: 1;

    svg {
      height: 1.1rem;
      width: 1.1rem;
      font-weight: bold;
      fill: white;
      margin-right: 0.3rem;
    }

    @media screen and (min-width: 768px) {
      flex-grow: 0;
      width: 13rem;
      height: 2.812rem;
    }
  }

  input[type='text']:focus {
    background: Thistle;
    color: white;
    transition: background 400ms ease-in-out;
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setHasSearched(true);
    setSearchResult([]);
    setIsLoading(true);

    const finding = await searchImages(searchValue, paginationPosition);
    const { data, pagination } = finding;

    if (Array.isArray(data) && data.length > 0) {
      setSearchResult(data);
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
  };

  async function getMoreImages() {
    const newImages = await searchImages(searchValue, paginationPosition);
    const { data, pagination } = newImages;
    console.log(pagination.count);

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
      <SearchBlockWrapper>
        <SearchFormWrapper>
          <form onSubmit={handleSubmit}>
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
              {searchIcon}Search
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
