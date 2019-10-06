import * as React from 'react';
import styled from 'styled-components';
import Columned from 'react-columned';
import { PAGE_SIZE } from '../../util/constants';
import { GifObj } from '../../types/apiData';
import { TrendingSearch } from '../TrendingSearch';
import ImageService from '../../util/apiFetch';

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
  const [didntFind, setDidntFind] = React.useState(false);
  const [hasSearched, setHasSearched] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState<GifObj[]>([]);
  const [moreContent, setMoreContent] = React.useState(true);
  const [isOnScrolled, setIsOnScrolled] = React.useState(false);

  const service = new ImageService();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearchResult([]);
    setIsLoading(true);
    service.init(searchValue);
    getMoreImages();
  };

  async function getMoreImages() {
    if (isLoading || !moreContent) {
      return;
    }

    let newImages = await service.get();
    if (Array.isArray(newImages) && newImages.length > 0) {
      setSearchResult(newImages);
    } else {
      setDidntFind(true);
    }

    //make sure we are not overflowing
    if (searchResult.length + newImages.length > PAGE_SIZE) {
      setMoreContent(false);
    }
    setIsLoading(false);
    setHasSearched(true);
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
          {isLoading && <Status>Laster…</Status>}
          {didntFind && <Status>{`Fant ingen ${searchValue}!`}</Status>}
          {searchResult && (
            <Columned>
              {searchResult.map(element => (
                <Gif src={element.images.downsized.url} alt={element.title}></Gif>
              ))}
            </Columned>
          )}
        </ResultWrapper>
      )}
    </SearchSectionWrapper>
  );
};

export default GiphySearch;
