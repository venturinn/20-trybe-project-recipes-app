import React from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import BottomNav from '../../components/BottomNav';
import { getRandomRecipe } from '../../services';

export default function ExploreFoods() {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  const goToExploreFoodsIngredients = () => {
    history.push('/explore/foods/ingredients');
  };

  const goToExploreFoodsNationalities = () => {
    history.push('/explore/foods/nationalities');
  };

  const goToExploreSurprise = async () => {
    const id = await getRandomRecipe(pathname);
    history.push(`/foods/${id.meals[0].idMeal}`);
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
        onClick={ goToExploreSurprise }
      >
        Surprise me!
      </button>

      <BottomNav />
    </section>
  );
}
