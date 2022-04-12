import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { getRecipesDetailsThunk } from '../../redux/actions';
import { getFoodAndDrinkPairingById } from '../../services';
import CardPairing from '../../components/CardPairing';
import ShareButton from '../../components/ShareButton';
import FavoriteButton from '../../components/FavoriteButton';
import { Ingredients, Instructions,
  MainContainer, Image, Title, Category,
  LinkCopied, Video, Title2, Recommended, ButtonStart,
  ButtonContainer, ShareContainer, FavoriteContainer } from './styled';
import GoBack from '../../components/GoBack';
import LoadingDetails from '../../components/LoadingDetails';

export default function RecipeDetails() {
  const [foodAndDrinkPairing, setFoodAndDrinkPairing] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isRecipeDone, setIsRecipeDone] = useState(true);
  const [startButtonLabel, setStartButtonLabel] = useState('Start Recipe');
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.searchResults.recipeDetails);
  const isLoading = useSelector((state) => state.loading);

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
      {isLoading && <LoadingDetails />}
      {details && details.length !== 0 && (
        <div>
          <GoBack onClick={ history.goBack } />
          <Image
            data-testid="recipe-photo"
            alt="Recipe illustration"
            src={ detailsInfo.illustration }
          />
          <Title data-testid="recipe-title">{detailsInfo.title}</Title>
          <Category data-testid="recipe-category">{detailsInfo.category}</Category>
          <ShareContainer>
            <ShareButton
              setIsLinkCopied={ setIsLinkCopied }
              testId="share-btn"
              type={ currRoute }
              id={ id }
            />
          </ShareContainer>
          <LinkCopied>
            {isLinkCopied && <p>Link copied!</p>}
          </LinkCopied>
          <FavoriteContainer>
            <FavoriteButton id={ id } details={ details } />
          </FavoriteContainer>
          <Ingredients>
            <Title2>Ingredients</Title2>
            {details.ingredientsAndMeasures.map(
              ({ ingredient, measure }, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${ingredient} - ${measure}`}
                </li>
              ),
            )}
          </Ingredients>
          <Instructions>
            <Title2>Instructions</Title2>
            <p data-testid="instructions">{details.strInstructions}</p>
          </Instructions>
          {currRoute === 'foods' && (
            <Video>
              <iframe
                title="video"
                data-testid="video"
                width="300px"
                height="250px"
                src={ `https://www.youtube.com/embed/${details.strYoutube.split('=')[1]}` }
                frameBorder="0"
                allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Video>
          )}
          <Recommended>
            <Title2>Recommended</Title2>
            {foodAndDrinkPairing && (
              <CardPairing type={ currRoute } pairingList={ foodAndDrinkPairing } />
            )}
          </Recommended>
          <ButtonContainer>
            {isRecipeDone && (
              <ButtonStart
                testId="start-recipe-btn"
                label={ startButtonLabel }
                className="start-recipe-btn"
                onClick={ () => history.push(`/${currRoute}/${id}/in-progress`) }
              />
            )}
          </ButtonContainer>
          <br />
        </div>
      )}
    </MainContainer>
  );
}
