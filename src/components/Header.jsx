import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { SiCodechef } from 'react-icons/si';
import { ImSearch } from 'react-icons/im';
import { setSearchBarVisibility } from '../redux/actions';
import SearchBar from './SearchBar';
import { IconsStyle } from './BottomNav';

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

const Profile = styled(SiCodechef)`
  ${IconsStyle}
  color: ${(props) => props.theme.color};
  margin: 0px 4px 10px;
`;

const Search = styled(ImSearch)`
  ${IconsStyle}
  width: 30px;
  margin: 0px 4px 10px;
`;

const StyledHeader = styled.header`
  height: 65px;
  width: 100vw;
  display: flex;
  position: relative;
  align-items: center;
  background-color:#f0f7ee;
  justify-content: space-between;
  padding: 10px 4px 0px 4px ;
  box-shadow: 4px 4px 10px rgb(0 0 0 / 15%);

  & p {
    color: #02484b;
    font-weight: bold;
    font-size: 26px;
    position: absolute;
    white-space: nowrap;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    margin-bottom: 0;
  }
`;

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
      <StyledHeader className="main-header">
        <Profile
          theme={ { color: title === 'Profile' ? '#ef8a17' : '#02484b' } }
          data-testid="profile-top-btn"
          onClick={ () => history.push('/profile') }
        />
        <p data-testid="page-title">
          { title }
        </p>
        {showSearchOption && (
          <Search
            data-testid="search-top-btn"
            onClick={ () => handleSearchBarVisibility(searchBarIsVisible) }
          />
        )}
      </StyledHeader>
      {searchBarIsVisible && <SearchBar currentRoute={ pathname } />}
    </section>
  );
}

export default Header;
