import React from 'react';
import { useHistory } from 'react-router-dom';
import Input from './Input';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function BottomNav() {
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
    <div data-testid="footer">
      <Input
        src={ drinkIcon }
        type="image"
        testId="drinks-bottom-btn"
        onClick={ goToDrinks }
      />
      <Input
        src={ exploreIcon }
        type="image"
        testId="explore-bottom-btn"
        onClick={ goToExplore }
      />
      <Input
        src={ mealIcon }
        type="image"
        testId="food-bottom-btn"
        onClick={ goToFood }
      />
    </div>
  );
}
