/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import MainPageCard from './MainPageCard';

function RecipesList() {
  // const location = useLocation();
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
        // const recipeId = listToRender[0].idMeal || listToRender[0].idDrink;
        const route = listToRender[0].idMeal
          ? `/foods/${listToRender[0].idMeal}`
          : `/drinks/${listToRender[0].idDrink}`;
        return (<Redirect push to={ route } />);
      }
      setRecipesList(listToRender);
    }
  }, [recipesResults]);

  console.log(recipesList);

  return (
    <div>
      {recipesList.map((recipe, index) => (
        <MainPageCard
          key={ recipe.idMeal || recipe.idDrink }
          recipe={ recipe }
          index={ index }
          // currRoute={ location.pathname }
        />
      ))}
    </div>
  );
}

export default RecipesList;
