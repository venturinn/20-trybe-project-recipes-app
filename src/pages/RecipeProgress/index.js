import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { getRecipesDetailsThunk } from '../../redux/actions';

const THREE = 3;

export default function RecipeProgress() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const location = useLocation();

  const { pathname } = location;
  const papathnameSplited = pathname.split('/');
  const currRoute = papathnameSplited[papathnameSplited.length - THREE];

  const [recipe, setRecipe] = useState({});
  const recipeDetails = useSelector((state) => state.searchResults.recipeDetails);

  useEffect(() => {
    setRecipe(recipeDetails);
  }, [recipeDetails]);

  if (recipeDetails.length < 1) dispatch(getRecipesDetailsThunk(id, `/${currRoute}`));

  const recipeName = recipe.strMeal || recipe.strDrink;
  const recipeThumb = recipe.strMealThumb || recipe.strDrinkThumb;

  return (
    <section>
      <img
        src={ recipeThumb }
        alt={ recipeName }
        data-testid="recipe-photo"
        width="200px"
        height="200px"
      />
      <h5 data-testid="recipe-title">{recipeName}</h5>
      <p data-testid="recipe-category">{recipe.strCategory}</p>
      {Object.keys(recipe).length > 0
      && recipe.ingredientsAndMeasures.map(({ ingredient, measure }, index) => (
        <p data-testid={ `${index}-ingredient-step` } key={ index }>
          {ingredient}
          {' '}
          -
          {' '}
          {measure}
        </p>
      ))}
      <h5 data-testid="instructions">Instructions</h5>
      {recipe.strInstructions}
    </section>
  );
}
