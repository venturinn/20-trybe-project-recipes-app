import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import styled, { ThemeProvider } from 'styled-components';
import { getRecipesDetailsThunk } from '../../redux/actions';
import Button from '../../components/Button';
import { getFoodAndDrinkPairingById } from '../../services';
import CardPairing from '../../components/CardPairing';
import ShareButton from '../../components/ShareButton';
import FavoriteButton from '../../components/FavoriteButton';
import './recipeDetails.css';

const MainContainer = styled.div`
background-color: #F0F7EE;
`;

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
`;

const Category = styled.p`
font-family:Arial, Helvetica, sans-serif;
margin-top:-10px;
color: #A9A9A9;
font-size:18px;
`;

const buttonProps = { color: '#078466' };

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
    const progressKey = currRoute === 'foods' ? 'meals' : 'cocktails';
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
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
    if (allDetails) {
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
    }
  };

  const detailsInfo = verifyFoodOrDrinkInfo(details);

  return (
    <MainContainer>
      {details && details.length !== 0 && (
        <div>
          <Image
            data-testid="recipe-photo"
            alt="Recipe illustration"
            src={ detailsInfo.illustration }
          />
          <Title data-testid="recipe-title">{detailsInfo.title}</Title>
          <Category data-testid="recipe-category">{detailsInfo.category}</Category>
          <ShareButton
            setIsLinkCopied={ setIsLinkCopied }
            testId="share-btn"
            type={ currRoute }
            id={ id }
          />
          {isLinkCopied && <p>Link copied!</p>}
          <FavoriteButton id={ id } details={ details } />
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
            <ThemeProvider theme={ buttonProps }>
              <Button
                testId="start-recipe-btn"
                label={ startButtonLabel }
                className="start-recipe-btn"
                onClick={ () => history.push(`/${currRoute}/${id}/in-progress`) }
              />
            </ThemeProvider>
          )}
        </div>
      )}
    </MainContainer>
  );
}
