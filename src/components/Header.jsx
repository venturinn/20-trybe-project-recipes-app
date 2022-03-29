import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchBarVisibility } from '../redux/actions';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const dispatch = useDispatch();
  const { titleToRender, searchOptionIsDisabled } = props;
  const [searchBarIsVisible, setSearchBarIsVisible] = useState(false);

  useEffect(() => {
    dispatch(setSearchBarVisibility(searchBarIsVisible));
  }, [dispatch, searchBarIsVisible]);

  const handleSearchBarVisibility = (isVisible) => {
    setSearchBarIsVisible(!isVisible);
  };

  return (
    <section>
      <header className="main-header">
        <Link to="/profile">
          <img
            src={ profileIcon }
            alt="profile-icon"
            data-testid="profile-top-btn"
          />
        </Link>
        <p data-testid="page-title">
          { titleToRender }
        </p>
        {!searchOptionIsDisabled && (
          <div
            role="button"
            data-testid="search-top-btn"
            tabIndex={ 0 }
            onClick={ () => handleSearchBarVisibility(searchBarIsVisible) }
            onKeyPress={ () => handleSearchBarVisibility(searchBarIsVisible) }
          >
            <img
              src={ searchIcon }
              alt="search-icon"
            />
          </div>
        )}
      </header>
      {searchBarIsVisible && <SearchBar />}
    </section>
  );
}

export default Header;

Header.propTypes = {
  titleToRender: PropTypes.string.isRequired,
  searchOptionIsDisabled: PropTypes.bool,
};

Header.defaultProps = {
  searchOptionIsDisabled: true,
};
