import axios from 'axios';

export const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43791514-0c71581f0b67d4acc8f65b528';

export const getImagesFromAPI = async (query, page) => {
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  const response = await axios.get(url);

  return response.data;
};
