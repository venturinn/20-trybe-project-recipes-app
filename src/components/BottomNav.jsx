import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Input from './Input';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const StyledNav = styled.div`
  height: 53.5px;
  width: 100vw;
  background-color:#02484B;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
`;

const StyledInput = styled(Input)`
  margin: 4px;
  border-radius: 3px;
  width: 44px;
  height: 44px;
`;

const BottomNav = () => {
  const history = useHistory();

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
      <StyledInput
        src={ drinkIcon }
        type="image"
        testId="drinks-bottom-btn"
        onClick={ goToDrinks }
      />
      <StyledInput
        src={ exploreIcon }
        type="image"
        testId="explore-bottom-btn"
        onClick={ goToExplore }
      />
      <StyledInput
        src={ mealIcon }
        type="image"
        testId="food-bottom-btn"
        onClick={ goToFood }
      />
    </StyledNav>
  );
};

export default BottomNav;
