import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { GiCompass } from 'react-icons/gi';
import { MdOutlineRestaurant } from 'react-icons/md';
import { FaCocktail } from 'react-icons/fa';

export const StyledNav = styled.div`
  height: 60px;
  width: 100vw;
  background-color: #f0f7ee;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25)
`;

export const IconsStyle = `
  margin: 4px;
  border-radius: 3px;
  color: #02484b;
  width: 44px;
  height: 44px;
  /* padding-bottom: 2px; */
`;

const Cocktail = styled(FaCocktail)`
  ${IconsStyle}
  color: ${(props) => props.theme.color};
`;
const Compass = styled(GiCompass)`
  ${IconsStyle}
  color: ${(props) => props.theme.color};
`;
const Meal = styled(MdOutlineRestaurant)`
  ${IconsStyle}
  color: ${(props) => props.theme.color};
`;

const BottomNav = () => {
  const history = useHistory();
  const { location: { pathname } } = history;

  const setIconColorByRoute = (currRoute, route) => (
    currRoute.split('/')[1] === route ? '#ef8a17' : '#02484b');

  const goToDrinks = () => {
    history.push('/drinks');
  };

  const goToExplore = () => {
    history.push('/explore');
  };

  const goToFood = () => {
    history.push('/foods');
  };

  return (
    <StyledNav data-testid="footer">
      <Cocktail
        theme={ { color: setIconColorByRoute(pathname, 'drinks') } }
        data-testid="drinks-bottom-btn"
        onClick={ goToDrinks }
      />
      <Compass
        theme={ { color: setIconColorByRoute(pathname, 'explore') } }
        data-testid="explore-bottom-btn"
        onClick={ goToExplore }
      />
      <Meal
        theme={ { color: setIconColorByRoute(pathname, 'foods') } }
        data-testid="food-bottom-btn"
        onClick={ goToFood }
      />
    </StyledNav>
  );
};

export default BottomNav;
