import React from 'react';
import { useHistory } from 'react-router-dom';

export default function ExploreDrinks() {
  const history = useHistory();

  const goToExploreDrinksIngredients = () => {
    history.push('./explore/drinks/ingredients');
  };

  return (
    <section>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ goToExploreDrinksIngredients }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
      >
        Surprise me!
      </button>
    </section>
  );
}
