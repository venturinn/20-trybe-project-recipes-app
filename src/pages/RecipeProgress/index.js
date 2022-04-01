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
  const progressKey = currRoute === 'foods' ? 'meals' : 'cocktails';

  // const [recipesInProgress, setRecipesInProgress] = useState({});
  const [checkboxesStatus, setCheckboxesStatus] = useState({});
  const [recipe, setRecipe] = useState({});
  const recipeDetails = useSelector((state) => state.searchResults.recipeDetails);

  const recipeName = recipe.strMeal || recipe.strDrink;
  const recipeThumb = recipe.strMealThumb || recipe.strDrinkThumb;
  const recipeId = recipe.idMeal || recipe.idDrink;

  useEffect(() => {
    setRecipe(recipeDetails);
    if (recipeDetails.length < 1) dispatch(getRecipesDetailsThunk(id, `/${currRoute}`));
  }, [currRoute, id, dispatch, recipeDetails]);

  useEffect(() => {
    if (Object.keys(recipe).length > 0) {
      console.log('não tem no localStorage');
      let checkboxes = {};
      recipe.ingredientsAndMeasures.forEach((item) => {
        checkboxes = { ...checkboxes, [item.ingredient]: false };
      });
      setCheckboxesStatus(checkboxes);
    }
  }, [recipe]);

  // useEffect(() => {
  //   if (localStorage.getItem('inProgressRecipes')) {
  //     setRecipesInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')));
  //   }
  // }, []);

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes')) {
      const fromLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (fromLocalStorage[progressKey] && fromLocalStorage[progressKey][id]) {
        setCheckboxesStatus(fromLocalStorage[progressKey][id]);
      }
    }
  }, [recipe]);

  const handleCheckboxOnChange = ({ name, checked }) => {
    const newCheckboxesStatus = { ...checkboxesStatus, [name]: checked };
    setCheckboxesStatus(newCheckboxesStatus);
  };

  useEffect(() => {
    if (!recipeId) return;
    const recipeProgress = { [recipeId]: checkboxesStatus };
    const fromLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (fromLocalStorage === null) {
      const newLocalStorage = { [progressKey]: { ...recipeProgress } };
      console.log(fromLocalStorage);
      console.log('sem others', newLocalStorage);
      localStorage.setItem('inProgressRecipes', JSON.stringify(newLocalStorage));
    } else {
      const newLocalStorage = {
        ...fromLocalStorage,
        [progressKey]: { ...fromLocalStorage[progressKey], ...recipeProgress },
      };
      console.log('com others', newLocalStorage);
      localStorage.setItem('inProgressRecipes', JSON.stringify(newLocalStorage));
    }
  }, [checkboxesStatus]);

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
        // onClick={}
      >
        Finish Recipe
      </button>
    </section>
  );
}
