import { Notify } from 'notiflix';
import { useEffect, useState } from 'react';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';

import { getImagesFromAPI } from 'pixabay-api';
import css from './App.module.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchImages = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const data = await getImagesFromAPI(query, page);
        const { totalHits, hits } = data;

        setImages(prevImages => (page === 1 ? hits : [...prevImages, ...hits]));
        setIsLoading(false);
        setIsEnd((page - 1) * 12 + hits.length >= totalHits);

        if (hits.length === 0) {
          Notify.failure(`Sorry, there are no images matching your search.`);
          return;
        } else {
          if (page === 1) {
            Notify.success(`Hooray! We found ${totalHits} images.`);
          }
        }
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        Notify.failure(`An error occurred while fetching data: ${error}`);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSubmit = newQuery => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (newQuery === '' || newQuery === query) {
      Notify.info(`Please provide a new search query.`);
      return;
    } else {
      setQuery(newQuery);
      setPage(1);
      setImages([]);
      setIsEnd(false);
    }
  };

  const handleLoadMore = () => {
    if (!isEnd) {
      setPage(prevPage => prevPage + 1);
    } else {
      Notify.info(`We're sorry but you reached the end of the search result. `);
    }
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} />
      {isLoading && <Loader />}
      {!isLoading && !isError && images.length > 0 && !isEnd && (
        <Button onClick={handleLoadMore} />
      )}
      {isError &&
        Notify.failure(`Something went wrong. Please try again later.`)}
    </div>
  );
};
