import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [newQuery, setNewQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(newQuery);
    setNewQuery('');
  };

  const handleChange = e => {
    setNewQuery(e.target.value.trim().toLowerCase());
  };

  return (
    <>
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormLabel}></span>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={newQuery}
            onChange={handleChange}
          />
        </form>
      </header>
    </>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
