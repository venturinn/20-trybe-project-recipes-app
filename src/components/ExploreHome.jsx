import React from 'react';
import { useHistory } from 'react-router-dom';

export default function ExploreHome() {
  const history = useHistory();

  const goToExploreFoods = () => {
    history.push('./explore/foods');
  };

  const goToExploreDrinks = () => {
    history.push('./explore/drinks');
  };

  return (
    <section>
      <button
        type="button"
        data-testid="explore-foods"
        onClick={ goToExploreFoods }
      >
        Explore Foods

      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ goToExploreDrinks }
      >
        Explore Drinks

      </button>
    </section>
  );
}
