import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { getRecipeDetailsById } from '../../services';
import Button from '../../components/Button';

export default function RecipeDetails() {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [typeOfRecipes, setTypeOfRecipes] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  // Solução adotada para capturar parte da URL (foods ou drinks):
  const location = useLocation();
  const { pathname } = location;
  const papathnameSplited = pathname.split('/');
  const currRoute = papathnameSplited[papathnameSplited.length - 2];

  useEffect(() => {
    const getDetails = async () => {
      const recipeDetailsResults = await getRecipeDetailsById(id, `/${currRoute}`);
      setRecipeDetails(recipeDetailsResults);
      setTypeOfRecipes(Object.keys(recipeDetailsResults));
    };
    getDetails();
  }, []);

  const getIngredientsList = () => {
    const recipeAtributes = Object.keys(recipeDetails[typeOfRecipes][0]);
    const ingredientsList = [];

    recipeAtributes.forEach((recipeAtribute) => {
      if (recipeAtribute.includes('strIngredient')
      && recipeDetails[typeOfRecipes][0][recipeAtribute] !== null
      ) {
        ingredientsList.push(recipeDetails[typeOfRecipes][0][recipeAtribute]);
      }
    });
    return ingredientsList;
  };

  return (
    <div>
      { console.log(recipeDetails)}
      { console.log(typeOfRecipes)}
      {typeOfRecipes[0] === 'drinks' && (
        <div>
          <p
            data-testid="recipe-title"
          >
            {recipeDetails[typeOfRecipes][0].strDrink}
          </p>
          <img
            data-testid="recipe-photo"
            alt="Recipe illustration"
            src={ recipeDetails[typeOfRecipes][0].strDrinkThumb }
            // inline apenas para melhor visualização
            width="200px"
            height="200px"
          />
        </div>
      )}
      {typeOfRecipes[0] === 'meals' && (
        <div>
          <p
            data-testid="recipe-title"
          >
            {recipeDetails[typeOfRecipes][0].strMeal}
          </p>
          <img
            data-testid="recipe-photo"
            alt="Recipe illustration"
            src={ recipeDetails[typeOfRecipes][0].strMealThumb }
            // inline apenas para melhor visualização
            width="200px"
            height="200px"
          />
        </div>
      )}
      { typeOfRecipes && (
        <div>
          <p
            data-testid="recipe-category"
          >
            {recipeDetails[typeOfRecipes][0].strCategory}
          </p>
          <p
            data-testid="instructions"
          >
            {recipeDetails[typeOfRecipes][0].strInstructions}
          </p>
          { getIngredientsList().map((ingredients, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ingredients}
            </p>))}
          <p data-testid={ `${id}-recomendation-card` }>Recomendadas</p>
        </div>
      )}
      <br />
      <Button
        testId="share-btn"
        label="Share Recipe"
      />
      <Button
        testId="favorite-btn"
        label="Favorite Recipe"
      />
      <Button
        testId="start-recipe-btn"
        label="Start Recipe"
        onClick={ () => history.push(`/${currRoute}/${id}/in-progress`) }
      />
    </div>
  );
}

// Tela de receita em progresso de comida: /foods/{id-da-receita}/in-progress;
// Tela de receita em progresso de bebida: /drinks/{id-da-receita}/in-progress;
