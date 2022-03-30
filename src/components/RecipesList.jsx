import React from 'react';
import { useSelector } from 'react-redux';
import CardFood from './CardFood';
import CardDrink from './CardDrink';

function RecipesList() {
  const recipesList = useSelector((state) => state.searchResults.searchBar);
  // console.log('recipes', recipesList);

  const typeOfRecipes = Object.keys(recipesList)[0];

  return (
    recipesList.length !== 0 && (
      <section>
        {typeOfRecipes === 'meals' ? (
          <CardFood recipesList={ recipesList.meals } />
        ) : (
          // procurar um tratamento mais especifico pra esse caso na refatoração
          <CardDrink recipesList={ recipesList.drinks } />
        )}
      </section>
    )
  );
}

export default RecipesList;
