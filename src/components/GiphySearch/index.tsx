import * as React from 'react';
import styled from 'styled-components';
import Columned from 'react-columned';
import { GifObj, Pagination as PaginationObj } from '../../types/apiData';
import { TrendingSearch } from '../TrendingSearch';
import searchImages from '../../util/searchImages';
import { PAGE_SIZE } from '../../util/constants';

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
    background-color: #aaa;
    color: #fff;
    height: 40px;
    width:10vw;
  }

  input[type='text'] {
    color: #333;
    font-size: 14px;
    height: 40px;
    width: 40vw;
	  max-width: 100%;
    }
  }

  input[type='text']:focus{
    outline: none;
    border:2px solid yellow;
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

    window.location.assign(`search=${encodeURIComponent(searchValue)}`);

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
              placeholder="Search gif"
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
        <button onClick={getMoreImages} title="Load more images">
          Load
        </button>
      )}
    </SearchSectionWrapper>
  );
};

export default GiphySearch;
