import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { getRecipesDetailsThunk } from '../../redux/actions';
import {
  saveRecipeProgressOnLocalStorage,
  getRecipeProgressFromLocalStorage,
} from '../../services/localStorage';

const routePosition = 3;

export default function RecipeProgress({ history }) {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const [currentRoute] = useState(() => {
    const { pathname } = location;
    const pathnameSplited = pathname.split('/');
    const currRoute = pathnameSplited[pathnameSplited.length - routePosition];
    return currRoute;
  });
  const recipeDetails = useSelector((state) => state.searchResults.recipeDetails);
  const [checkboxesState, setCheckboxesState] = useState({});
  const recipeName = recipeDetails.strMeal || recipeDetails.strDrink;
  const recipeThumb = recipeDetails.strMealThumb || recipeDetails.strDrinkThumb;
  const progressKey = currentRoute === 'foods' ? 'meals' : 'cocktails';
  const recipeId = useRef('');

  const createCheckboxesStatusAndSave = (currRecipe) => {
    let checkboxes = {};
    currRecipe.ingredientsAndMeasures.forEach((value) => {
      checkboxes = { ...checkboxes, [value.ingredient]: false };
    });
    setCheckboxesState(checkboxes);
  };

  useEffect(() => {
    dispatch(getRecipesDetailsThunk(id, `/${currentRoute}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoute, id]);

  useEffect(() => {
    if (Object.keys(recipeDetails).length > 1) {
      recipeId.current = recipeDetails.idMeal || recipeDetails.idDrink;
      const recipeProgress = getRecipeProgressFromLocalStorage(
        progressKey, recipeId.current,
      );
      if (recipeProgress === undefined) {
        createCheckboxesStatusAndSave(recipeDetails);
      } else {
        setCheckboxesState(recipeProgress);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeDetails]);

  useEffect(() => {
    if (Object.keys(recipeDetails).length > 1) {
      const currRecipeProgress = { [recipeId.current]: checkboxesState };
      saveRecipeProgressOnLocalStorage(progressKey, currRecipeProgress);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkboxesState]);

  const handleCheckboxOnChange = ({ name, checked }) => {
    const newCheckboxesStatus = { ...checkboxesState, [name]: checked };
    setCheckboxesState(newCheckboxesStatus);
  };

  const redirectToDoneRecipes = () => {
    history.push('/done-recipes');
  };

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
      <p data-testid="recipe-category">{recipeDetails.strCategory}</p>
      <div>
        <button type="button" data-testid="share-btn">compartilhar</button>
        <button type="button" data-testid="favorite-btn">favoritar</button>
      </div>
      {Object.keys(checkboxesState).length > 1
      && recipeDetails.ingredientsAndMeasures.map(({ ingredient, measure }, index) => {
        console.log(checkboxesState[ingredient] || false);
        return (
          <label htmlFor={ id } key={ index } data-testid={ `${index}-ingredient-step` }>
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
        onClick={ () => redirectToDoneRecipes() }
      >
        Finish Recipe
      </button>
    </section>
  );
}

RecipeProgress.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
