import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { getRecipesDetailsThunk } from '../../redux/actions';
import {
  saveRecipeProgressOnLocalStorage,
  getRecipeProgressFromLocalStorage,
} from '../../services/localStorage';

const THREE = 3;
export default function RecipeProgress({ history }) {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { pathname } = location;

  const [currentRoute] = useState(() => {
    const papathnameSplited = pathname.split('/');
    const currRoute = papathnameSplited[papathnameSplited.length - THREE];
    return currRoute;
  });

  const recipeDetails = useSelector((state) => state.searchResults.recipeDetails);
  const [recipesInProgress, setRecipesInProgress] = useState({});
  const [checkboxesStatus, setCheckboxesStatus] = useState({});
  const [recipe, setRecipe] = useState(recipeDetails);

  const recipeName = recipe.strMeal || recipe.strDrink;
  const recipeThumb = recipe.strMealThumb || recipe.strDrinkThumb;
  const recipeId = recipe.idMeal || recipe.idDrink;
  const progressKey = currentRoute === 'foods' ? 'meals' : 'cocktails';

  const createCheckboxesStatusAndSave = (currRecipe) => {
    let checkboxes = {};
    currRecipe.ingredientsAndMeasures.forEach((item) => {
      checkboxes = { ...checkboxes, [item.ingredient]: false };
    });
    setCheckboxesStatus(checkboxes);
  };

  useEffect(() => {
    console.log(getRecipeProgressFromLocalStorage(progressKey, id));
    if (localStorage.getItem('inProgressRecipes')) {
      setRecipesInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')));
    } else {
      setRecipesInProgress({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getRecipesDetailsThunk(id, `/${currentRoute}`));
    setRecipe(recipeDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoute, recipeDetails]);

  useEffect(() => {
    const currRecipeHasProgressSaved = !!recipesInProgress[progressKey]
    && !!recipesInProgress[progressKey][id];

    const currRecipeHasLoaded = Object.keys(recipe).length > 0;

    if (currRecipeHasProgressSaved) {
      const progressSaved = recipesInProgress[progressKey][id];
      setCheckboxesStatus(progressSaved);
    } else if (currRecipeHasLoaded) {
      createCheckboxesStatusAndSave(recipe);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe, recipesInProgress]);

  useEffect(() => {
    const currRecipeProgress = { [recipeId]: checkboxesStatus };
    saveRecipeProgressOnLocalStorage(progressKey, currRecipeProgress);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkboxesStatus]);

  const handleCheckboxOnChange = ({ name, checked }) => {
    const newCheckboxesStatus = { ...checkboxesStatus, [name]: checked };
    setCheckboxesStatus(newCheckboxesStatus);
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
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ !Object.values(checkboxesStatus).every((status) => status === true) }
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
