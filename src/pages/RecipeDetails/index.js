import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { getRecipesDetailsThunk } from '../../redux/actions';
import Button from '../../components/Button';
import { getFoodAndDrinkPairingById } from '../../services';
import CardPairing from '../../components/CardPairing';

export default function RecipeDetails() {
  const [foodAndDrinkPairing, setFoodAndDrinkPairing] = useState(false);
  // const [typeOfRecipes, setTypeOfRecipes] = useState('Drinks');
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.searchResults.recipeDetails);

  console.log('paring', foodAndDrinkPairing);

  // Solução adotada para capturar parte da URL (foods ou drinks):
  const location = useLocation();
  const { pathname } = location;
  const papathnameSplited = pathname.split('/');
  const currRoute = papathnameSplited[papathnameSplited.length - 2];

  useEffect(() => {
    const getDetails = () => {
      const recipeDetailsResults = dispatch(getRecipesDetailsThunk(id, `/${currRoute}`));
      return recipeDetailsResults;
    };
    getDetails();
  }, [id, currRoute, dispatch]);

  useEffect(() => {
    const getFoodAndDrinkPairing = async () => {
      const foodDrinkPairing = await getFoodAndDrinkPairingById(id, `/${currRoute}`);
      setFoodAndDrinkPairing(foodDrinkPairing);
    };
    getFoodAndDrinkPairing();
  }, [id, currRoute]);

  return (
    <div>
      {details.length !== 0 && (
        <div>
          { currRoute === 'drinks' && (
            <div>
              <p
                data-testid="recipe-title"
              >
                { details.strDrink }
              </p>
              <img
                data-testid="recipe-photo"
                alt="Recipe illustration"
                src={ details.strDrinkThumb }
                // inline apenas para melhor visualização
                width="200px"
                height="200px"
              />
            </div>
          )}
          { currRoute === 'foods' && (
            <div>
              <p
                data-testid="recipe-title"
              >
                { details.strMeal }
              </p>
              <img
                data-testid="recipe-photo"
                alt="Recipe illustration"
                src={ details.strMealThumb }
                // inline apenas para melhor visualização
                width="200px"
                height="200px"
              />
              <video data-testid="video" width="400" height="300">
                <source src={ details.strYoutube } />
                <track kind="captions" srcLang="en" label="english_captions" />
              </video>
            </div>
          )}
          <p
            data-testid="recipe-category"
          >
            {details.strCategory}
          </p>
          <p
            data-testid="instructions"
          >
            {details.strInstructions}
          </p>
          {details.ingredientsAndMeasures.map(({ ingredient, measure }, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ingredient} - ${measure}`}
            </p>
          )) }
          <br />
          {foodAndDrinkPairing
          && <CardPairing type={ currRoute } pairingList={ foodAndDrinkPairing } />}
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
      )}
    </div>
  );
}
