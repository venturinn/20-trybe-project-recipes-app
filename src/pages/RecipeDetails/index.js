import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { getRecipesDetailsThunk } from '../../redux/actions';
import Button from '../../components/Button';
import { getFoodAndDrinkPairingById } from '../../services';
import CardPairing from '../../components/CardPairing';
import ShareButton from '../../components/ShareButton';
import FavoriteButton from '../../components/FavoriteButton';
import './recipeDetails.css';

export default function RecipeDetails() {
  const [foodAndDrinkPairing, setFoodAndDrinkPairing] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isRecipeDone, setIsRecipeDone] = useState(true);
  const [startButtonLabel, setStartButtonLabel] = useState('Start Recipe');
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.searchResults.recipeDetails);

  // Solução adotada para capturar parte da URL (foods ou drinks):
  const location = useLocation();
  const { pathname } = location;
  const papathnameSplited = pathname.split('/');
  const currRoute = papathnameSplited[papathnameSplited.length - 2];
  
  const getFoodAndDrinkPairing = async () => {
    const foodDrinkPairing = await getFoodAndDrinkPairingById(id, `/${currRoute}`);
    setFoodAndDrinkPairing(foodDrinkPairing);
  };

  const getDetails = () => {
    const recipeDetailsResults = dispatch(getRecipesDetailsThunk(id, `/${currRoute}`));
    return recipeDetailsResults;
  };

  const verifyRecipeInProgress = () => {
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const progressKey = currRoute === 'foods' ? 'meals' : 'cocktails';
    if (recipesInProgress !== null) {
      const drinkOrFoodinProgress = Object.keys(recipesInProgress[progressKey]);
      drinkOrFoodinProgress.forEach((idInProgress) => {
        if (idInProgress === id) {
          setStartButtonLabel('Continue Recipe');
        }
      });
    }
  };

  const verifyRecipeDone = () => {
    const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipesDone !== null) {
      recipesDone.forEach((recipe) => {
        if (recipe.id === id) {
          setIsRecipeDone(false);
        }
      });
    }
  };

  useEffect(() => {
    verifyRecipeInProgress();
    verifyRecipeDone();
    getFoodAndDrinkPairing();
    getDetails();
  }, []);

  const verifyFoodOrDrinkInfo = (allDetails) => {
    const title = allDetails.strMeal || allDetails.strDrink;
    const illustration = allDetails.strMealThumb || allDetails.strDrinkThumb;
    const category = allDetails.strAlcoholic
      ? allDetails.strAlcoholic
      : allDetails.strCategory;

    return {
      title,
      illustration,
      category,
    };
  };

  const detailsInfo = verifyFoodOrDrinkInfo(details);

  return (
    <div>
      {details.length !== 0 && (
        <div>
          <p data-testid="recipe-title">{detailsInfo.title}</p>
          <p data-testid="recipe-category">{detailsInfo.category}</p>
          <img
            data-testid="recipe-photo"
            alt="Recipe illustration"
            src={ detailsInfo.illustration }
            // inline apenas para melhor visualização
            width="200px"
            height="200px"
          />

          <FavoriteButton id={ id } isDrinkOrFood={ currRoute } details={ details } />
          <ShareButton setIsLinkCopied={ setIsLinkCopied } />
          {isLinkCopied && <p>Link copied!</p>}

          <p data-testid="instructions">{details.strInstructions}</p>
          {details.ingredientsAndMeasures.map(
            ({ ingredient, measure }, index) => (
              <p
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ingredient} - ${measure}`}
              </p>
            ),
          )}

          {currRoute === 'foods' && (
            <div>
              <video data-testid="video" width="200" height="150">
                <source src={ details.strYoutube } />
                <track kind="captions" srcLang="en" label="english_captions" />
              </video>
            </div>
          )}
          <br />

          {foodAndDrinkPairing && (
            <CardPairing type={ currRoute } pairingList={ foodAndDrinkPairing } />
          )}

          {isRecipeDone && (
            <Button
              testId="start-recipe-btn"
              label={ startButtonLabel }
              className="start-recipe-btn"
              onClick={ () => history.push(`/${currRoute}/${id}/in-progress`) }
            />
          )}
        </div>
      )}
    </div>
  );
}
