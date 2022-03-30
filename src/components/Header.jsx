import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

const TITLE_BY_ROUTE = {
  '/foods': 'Foods',
  '/drinks': 'Drinks',
  '/explore': 'Explore',
  '/explore/foods': 'Explore Foods',
  '/explore/drinks': 'Explore Drinks',
  '/explore/foods/ingredients': 'Explore Ingredients',
  '/explore/drinks/ingredients': 'Explore Ingredients',
  '/explore/foods/nationalities': 'Explore Nationatilies',
  '/profile': 'Profile',
  '/done-recipes': 'Done Recipies',
  '/favorite-recipes': 'Favorite Recipes',
};

function Header() {
  const history = useHistory();
  const { pathname } = history.location;

  const title = TITLE_BY_ROUTE[pathname];
  const showSearchOption = pathname === '/foods' || pathname === '/drinks';

  const [searchBarIsVisible, setSearchBarIsVisible] = useState(false);

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
          { title }
        </p>
        {showSearchOption && (
          // refatorar depois reutilizando o componente Input.jsx
          <input
            type="image"
            src={ searchIcon }
            alt="search-icon"
            data-testid="search-top-btn"
            onClick={ () => handleSearchBarVisibility(searchBarIsVisible) }
          />
        )}
      </header>
      {searchBarIsVisible && <SearchBar currentRoute={ title } />}
    </section>
  );
}

export default Header;
