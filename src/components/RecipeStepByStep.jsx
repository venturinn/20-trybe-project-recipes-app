import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import styled from 'styled-components';
import {
  saveRecipeProgressOnLocalStorage,
  getRecipeProgressFromLocalStorage,
  saveDoneRecipeOnLocalStorage,
} from '../services/localStorage';

const Image = styled.img`
width:360px;
height:170px;
object-fit:cover;
`;

const Title = styled.p`
font-family:Arial, Helvetica, sans-serif;
color: #000000;
margin-top:6px;
margin-bottom: 0px;
font-size: 35px;
font-weight: bold;
margin-left: 10px;
`;

const Category = styled.p`
font-family:Arial, Helvetica, sans-serif;
margin-top:-10px;
color: #A9A9A9;
font-size:18px;
margin-left: 10px;
`;

const Title2 = styled.p`
font-family:Arial, Helvetica, sans-serif;
color: #000000;
font-size:25px;
`;

const Ingredients = styled.div`
position:relative;
top: 15px;
width: 340px;
height: 200px;
margin-left: auto;
margin-right: auto;
padding: 15px;
background-color:white;
border-radius: 10px;
box-shadow: 0px 4px 8px rgba(0,0,0,0.3);
overflow-y: auto;
margin-bottom:20px;
text-align: justify;
`;

const Instructions = styled.div`
position:relative;
top: 15px;
width: 340px;
height: 280px;
margin-left: auto;
margin-right: auto;
padding: 15px;
background-color:white;
border-radius: 10px;
box-shadow: 0px 4px 8px rgba(0,0,0,0.3);
overflow-y: auto;
margin-bottom:20px;
text-align: justify;
`;

const ButtonContainer = styled.div`
width: 300px;
margin-top: 30px;
margin-left: auto;
margin-right: auto;
`;

const ButtonFinish = styled.button`
background-color: #078466;
border-radius: 10px;
color: white;
font-size: 20px;
width: 300px;
padding: 10px 70px 10px 70px;
`;

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
      <Image
        src={ recipeThumb.current }
        alt={ recipeName.current }
        data-testid="recipe-photo"
        width="200px"
        height="200px"
      />
      <Title data-testid="recipe-title">{recipeName.current}</Title>
      <Category data-testid="recipe-category">{recipeDetails.strCategory}</Category>
      <Ingredients>
        <Title2>Ingredients</Title2>
        {Object.keys(checkboxesState).length > 0
      && recipeDetails.ingredientsAndMeasures.map(({ ingredient, measure }, index) => {
        console.log(checkboxesState[ingredient] || false);
        return (
          <div key={ index }>
            <label
              htmlFor={ `${index}` }
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
          </div>
        );
      })}
      </Ingredients>
      <Instructions>
        <Title2 data-testid="instructions">Instructions</Title2>
        {recipeDetails.strInstructions}
      </Instructions>
      <ButtonContainer>
        <ButtonFinish
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ !Object.values(checkboxesState).every((status) => status === true) }
          onClick={ () => redirectToDoneRecipes(recipeDetails) }
        >
          Finish Recipe
        </ButtonFinish>
      </ButtonContainer>
    </section>
  );
}

RecipeStepByStep.propTypes = {
  recipeDetails: PropTypes.objectOf(PropTypes.shape).isRequired,
  recipeKey: PropTypes.string.isRequired,
};
