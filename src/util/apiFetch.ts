import { GIPHY_API_KEY, PAGE_SIZE } from './constants';
import { Root } from '../types/apiData';

/**
 * Handles fetching gifs from GIPHY
 */
export default class ImageService {
  query = '';
  offset = 0;

  /**
   * Initializes the service with a new query
   *
   * @param {string} query The new search query
   */
  init(query: string) {
    this.query = query;
    this.offset = 0;
  }

  /**
   * Fetches more images from GIPHY
   *
   * @returns { [{imageUrl:string, title:string, redirectUrl:string}] } Array of data for the new images
   */
  async get() {
    let url =
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&` +
      `q=${this.query}&limit=${PAGE_SIZE}&offset=${this.offset}&rating=G&lang=en`;

    try {
      let request = await fetch(url);
      if (!request.ok) {
        throw new Error("Can't fetch gits!");
      }

      let response: Root = await request.json();
      console.log(response);

      this.offset += response.pagination.count;

      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
