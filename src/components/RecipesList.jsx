/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import MainPageCard from './MainPageCard';
import { Wrapper } from '../pages/DoneRecipes/style';
import { RecipesListSection } from '../pages/Foods/style';

function RecipesList() {
  const [recipesList, setRecipesList] = useState([]);
  const recipesResults = useSelector((state) => state.searchResults.searchBar);
  const mainPageFilter = useSelector((state) => state.filter.mainPage);

  useEffect(() => {
    if (Object.keys(recipesResults).length === 1) {
      const recipes = recipesResults.meals
        ? recipesResults.meals : recipesResults.drinks;
      const cardLimit = 11;
      const listToRender = recipes.filter((_item, index) => index <= cardLimit);
      const shouldRedirect = mainPageFilter === '';
      if (listToRender.length === 1 && shouldRedirect) {
        const route = listToRender[0].idMeal
          ? `/foods/${listToRender[0].idMeal}`
          : `/drinks/${listToRender[0].idDrink}`;
        return (<Redirect push to={ route } />);
      }
      setRecipesList(listToRender);
    }
  }, [recipesResults]);

  return (
    <RecipesListSection>
      <Wrapper>
        {recipesList.map((recipe, index) => (
          <MainPageCard
            key={ recipe.idMeal || recipe.idDrink }
            recipe={ recipe }
            index={ index }
          />
        ))}
      </Wrapper>
    </RecipesListSection>
  );
}

export default RecipesList;
