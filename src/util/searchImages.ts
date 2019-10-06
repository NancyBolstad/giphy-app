import { Root } from '../types/apiData';
import { SEARCH_ENDPOINT, TRENDING_ENDPOINT, PAGE_SIZE, GIPHY_API_KEY } from '../util/constants';

async function searchImages(searchTerm: string, offset: number = 0) {
  let url = '';
  if (searchTerm === '') {
    url = `${TRENDING_ENDPOINT}?`;
  } else {
    url = `${SEARCH_ENDPOINT}?q=${searchTerm}&`;
  }
  url += `limit=${PAGE_SIZE}&offset=${offset}&rating=G&lang=en&api_key=${GIPHY_API_KEY}`;

  try {
    const response = await fetch(url);
    const data: Root = await response.json();

    return data;
  } catch (err) {
    throw err;
  }
}

export default searchImages;
