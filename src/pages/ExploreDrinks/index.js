import React from 'react';
import { useHistory } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';
import { getRandomRecipe } from '../../services';

export default function ExploreDrinks() {
  const history = useHistory();

  const goToExploreDrinksIngredients = () => {
    history.push('/explore/drinks/ingredients');
  };

  const goToExploreSurprise = async () => {
    const id = await getRandomRecipe();
    history.push(`/drinks/${id.drinks[0].idDrink}`);
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
        onClick={ goToExploreSurprise }
      >
        Surprise me!
      </button>
      <BottomNav />
    </section>
  );
}
