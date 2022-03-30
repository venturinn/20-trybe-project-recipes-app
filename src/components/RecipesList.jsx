import React from 'react';
import { useSelector } from 'react-redux';
import CardFood from './CardFood';
import CardDrink from './CardDrink';

function RecipesList() {
  const recipesList = useSelector((state) => state.searchResults.searchBar);
  const typeOfRecipes = Object.keys(recipesList)[0];
  console.log(typeOfRecipes);

  return (
    recipesList.length !== 0 && (
      <section>
        {typeOfRecipes === 'meals' ? (
          <CardFood recipesList={ recipesList.meals } />
        ) : (
          // procurar um tratamento mais especifico pra esse caso na refatoração
          <div>
            {recipesList.drinks
            && <CardDrink recipesList={ recipesList.drinks } />}
          </div>
        )}
      </section>
    )
  );
}

export default RecipesList;
