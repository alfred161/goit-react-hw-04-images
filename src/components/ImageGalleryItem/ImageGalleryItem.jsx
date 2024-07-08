import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  useEffect(() => {
    const galleryDom = document.querySelector('.js-gallery');
    if (!galleryDom) {
      return;
    }

    if (showModal) {
      galleryDom.style.pointerEvents = 'none';
    } else {
      galleryDom.style.pointerEvents = 'auto';
    }
  }, [showModal]);

  const { webformatURL, largeImageURL, tags } = image;

  return (
    <li className={css.imageGalleryItem} onClick={toggleModal}>
      <img
        src={webformatURL}
        alt={tags}
        className={css.imageGalleryItemImage}
      />
      {showModal && (
        <Modal image={largeImageURL} tags={tags} onClose={toggleModal} />
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }).isRequired,
};

export default ImageGalleryItem;
