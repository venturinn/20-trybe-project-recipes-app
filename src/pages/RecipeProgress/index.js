import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { getRecipesDetailsThunk } from '../../redux/actions';

const THREE = 3;
export default function RecipeProgress() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { pathname } = location;
  const papathnameSplited = pathname.split('/');
  const currRoute = papathnameSplited[papathnameSplited.length - THREE];

  const [checkboxesStatus, setCheckboxesStatus] = useState({});
  const [recipe, setRecipe] = useState({});
  const recipeDetails = useSelector((state) => state.searchResults.recipeDetails);

  useEffect(() => {
    setRecipe(recipeDetails);
    if (recipeDetails.length < 1) dispatch(getRecipesDetailsThunk(id, `/${currRoute}`));
  }, [currRoute, id, dispatch, recipeDetails]);

  useEffect(() => {
    if (Object.keys(recipe).length > 0) {
      let checkboxes = {};
      recipe.ingredientsAndMeasures.forEach((item) => {
        checkboxes = { ...checkboxes, [item.ingredient]: false };
      });
      setCheckboxesStatus(checkboxes);
    }
  }, [recipe]);

  const handleCheckboxOnChange = ({ name, checked }) => {
    const newCheckboxesStatus = { ...checkboxesStatus, [name]: checked };
    setCheckboxesStatus(newCheckboxesStatus);
  };

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
      <button type="button" data-testid="share-btn">compartilhar</button>
      <button type="button" data-testid="favorite-btn">favoritar</button>
      {Object.keys(recipe).length > 0
      && recipe.ingredientsAndMeasures.map(({ ingredient, measure }, index) => (
        <label htmlFor={ id } key={ index } data-testid={ `${index}-ingredient-step` }>
          { `${ingredient} - ${measure}` }
          <input
            id={ `${index}` }
            type="checkbox"
            name={ ingredient }
            checked={ checkboxesStatus[ingredient] || false }
            onChange={ ({ target }) => handleCheckboxOnChange(target) }
          />
        </label>
      ))}
      <h5 data-testid="instructions">Instructions</h5>
      {recipe.strInstructions}
      <button data-testid="finish-recipe-btn" type="button">finish</button>
    </section>
  );
}
