import React from 'react';
import { useHistory } from 'react-router-dom';

export default function ExploreFoods() {
  const history = useHistory();

  const goToExploreFoodsIngredients = () => {
    history.push('./explore/foods/ingredients');
  };

  const goToExploreFoodsNationalities = () => {
    history.push('./explore/foods/nationalities');
  };

  return (
    <section>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ goToExploreFoodsIngredients }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ goToExploreFoodsNationalities }
      >
        By Nationality
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
