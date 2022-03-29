import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from './Button';
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
      <Button
        src={ drinkIcon }
        icon={ <img alt="DrinkIcon" src={ drinkIcon } /> }
        testId="drinks-bottom-btn"
        onClick={ goToDrinks }
      />
      <Button
        src={ exploreIcon }
        icon={ <img alt="ExploreIcon" src={ exploreIcon } /> }
        testId="explore-bottom-btn"
        onClick={ goToExplore }
      />
      <Button
        src={ mealIcon }
        icon={ <img alt="MealIcon" src={ mealIcon } /> }
        testId="food-bottom-btn"
        onClick={ goToFood }
      />
    </div>
  );
}
