import React from 'react';
import { useHistory } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';
import { getRandomRecipe } from '../../services';
import Header from '../../components/Header';
import { ExploreSection, Wrapper } from '../Explore/style';

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
    <ExploreSection>
      <Header />
      <Wrapper>
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
      </Wrapper>
      <BottomNav />
    </ExploreSection>
  );
}
