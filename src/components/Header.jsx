import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { setSearchBarVisibility } from '../redux/actions';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import Input from './Input';

const TITLE_BY_ROUTE = {
  '/foods': 'Foods',
  '/drinks': 'Drinks',
  '/explore': 'Explore',
  '/explore/foods': 'Explore Foods',
  '/explore/drinks': 'Explore Drinks',
  '/explore/foods/ingredients': 'Explore Ingredients',
  '/explore/drinks/ingredients': 'Explore Ingredients',
  '/explore/foods/nationalities': 'Explore Nationalities',
  '/profile': 'Profile',
  '/done-recipes': 'Done Recipes',
  '/favorite-recipes': 'Favorite Recipes',
};

function Header() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { pathname } = location;

  const title = TITLE_BY_ROUTE[pathname];
  const showSearchOption = (pathname === '/foods'
  || pathname === '/drinks' || pathname === '/explore/foods/nationalities');

  const [searchBarIsVisible, setSearchBarIsVisible] = useState(false);

  const handleSearchBarVisibility = (isVisible) => {
    setSearchBarIsVisible(!isVisible);
    dispatch(setSearchBarVisibility(!isVisible));
  };

  return (
    <section>
      <header className="main-header">
        <Input
          src={ profileIcon }
          alt="profile-icon"
          testId="profile-top-btn"
          type="image"
          onClick={ () => history.push('/profile') }
        />
        <p data-testid="page-title">
          { title }
        </p>
        {showSearchOption && (
          <Input
            type="image"
            src={ searchIcon }
            alt="search-icon"
            testId="search-top-btn"
            onClick={ () => handleSearchBarVisibility(searchBarIsVisible) }
          />
        )}
      </header>
      {searchBarIsVisible && <SearchBar currentRoute={ pathname } />}
    </section>
  );
}

export default Header;
