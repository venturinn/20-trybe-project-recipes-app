import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import {
  saveRecipeProgressOnLocalStorage,
  getRecipeProgressFromLocalStorage,
  saveDoneRecipeOnLocalStorage,
} from '../services/localStorage';

export default function RecipeStepByStep(props) {
  const { recipeDetails, recipeKey } = props;
  const [checkboxesState, setCheckboxesState] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const recipeName = useRef('');
  const recipeThumb = useRef('');
  const recipeId = useRef('');

  const createCheckboxesStatusAndSave = (currRecipe) => {
    let checkboxes = {};
    currRecipe.ingredientsAndMeasures.forEach((value) => {
      checkboxes = { ...checkboxes, [value.ingredient]: false };
    });
    setCheckboxesState(checkboxes);
  };

  useEffect(() => {
    recipeId.current = recipeDetails.idMeal || recipeDetails.idDrink;
    recipeName.current = recipeDetails.strMeal || recipeDetails.strDrink;
    recipeThumb.current = recipeDetails.strMealThumb || recipeDetails.strDrinkThumb;

    const recipeProgress = getRecipeProgressFromLocalStorage(
      recipeKey, recipeId.current,
    );
    if (recipeProgress === undefined) {
      createCheckboxesStatusAndSave(recipeDetails);
    } else {
      setCheckboxesState(recipeProgress);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckboxOnChange = ({ name, checked }) => {
    const newCheckboxesStatus = { ...checkboxesState, [name]: checked };
    setCheckboxesState(newCheckboxesStatus);
  };

  useEffect(() => {
    const currRecipeProgress = { [recipeId.current]: checkboxesState };
    saveRecipeProgressOnLocalStorage(recipeKey, currRecipeProgress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkboxesState]);

  const redirectToDoneRecipes = (details) => {
    setShouldRedirect(true);
    saveDoneRecipeOnLocalStorage(details);
  };

  return (
    <section>
      {shouldRedirect && <Redirect to="/done-recipes" />}
      <img
        src={ recipeThumb.current }
        alt={ recipeName.current }
        data-testid="recipe-photo"
        width="200px"
        height="200px"
      />
      <h5 data-testid="recipe-title">{recipeName.current}</h5>
      <p data-testid="recipe-category">{recipeDetails.strCategory}</p>
      {Object.keys(checkboxesState).length > 0
      && recipeDetails.ingredientsAndMeasures.map(({ ingredient, measure }, index) => {
        console.log(checkboxesState[ingredient] || false);
        return (
          <label
            htmlFor={ `${index}` }
            key={ index }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              id={ `${index}` }
              type="checkbox"
              name={ ingredient }
              checked={ checkboxesState[ingredient] || false }
              onChange={ ({ target }) => handleCheckboxOnChange(target) }
            />
            { `${ingredient} - ${measure}` }
          </label>
        );
      })}
      <h5 data-testid="instructions">Instructions</h5>
      {recipeDetails.strInstructions}
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ !Object.values(checkboxesState).every((status) => status === true) }
        onClick={ () => redirectToDoneRecipes(recipeDetails) }
      >
        Finish Recipe
      </button>
    </section>
  );
}

RecipeStepByStep.propTypes = {
  recipeDetails: PropTypes.objectOf(PropTypes.shape).isRequired,
  recipeKey: PropTypes.string.isRequired,
};
