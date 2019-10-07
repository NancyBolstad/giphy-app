import { Root } from '../types/apiData';
import { PAGE_SIZE, GIPHY_API_KEY } from './constants';

interface giphyServiceProps {
  searchEndpoint?: string;
  searchTerm?: string;
  offset?: number;
}

async function giphyService({ searchEndpoint, searchTerm, offset }: giphyServiceProps) {
  const url = `https://api.giphy.com/v1/gifs/${
    searchEndpoint ? searchEndpoint : 'trending'
  }?api_key=${GIPHY_API_KEY}&q=${searchTerm}&limit=${PAGE_SIZE}&offset=${
    offset ? offset : 0
  }&rating=G&lang=en`;

  try {
    const response = await fetch(url);
    const data: Root = await response.json();

    return data;
  } catch (err) {
    throw err;
  }
}

export default giphyService;
