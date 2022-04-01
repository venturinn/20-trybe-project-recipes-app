import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { getRecipesDetailsThunk } from '../../redux/actions';
import Button from '../../components/Button';
import { getFoodAndDrinkPairingById } from '../../services';
import CardPairing from '../../components/CardPairing';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import Input from '../../components/Input';

export default function RecipeDetails() {
  const [foodAndDrinkPairing, setFoodAndDrinkPairing] = useState(false);
  const [heartFavorite, setheartFavorite] = useState(whiteHeartIcon);
  const [favoriteRecipesList, setFavoriteRecipesList] = useState(null);
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.searchResults.recipeDetails);

  // Solução adotada para capturar parte da URL (foods ou drinks):
  const location = useLocation();
  const { pathname } = location;
  const papathnameSplited = pathname.split('/');
  const currRoute = papathnameSplited[papathnameSplited.length - 2];

  // API Details
  useEffect(() => {
    const getDetails = () => {
      const recipeDetailsResults = dispatch(getRecipesDetailsThunk(id, `/${currRoute}`));
      return recipeDetailsResults;
    };
    getDetails();
  }, [id, currRoute, dispatch]);

  // API Pairing
  useEffect(() => {
    const getFoodAndDrinkPairing = async () => {
      const foodDrinkPairing = await getFoodAndDrinkPairingById(id, `/${currRoute}`);
      setFoodAndDrinkPairing(foodDrinkPairing);
    };
    getFoodAndDrinkPairing();
  }, [id, currRoute]);

  // REF.: https://stackoverflow.com/questions/49618618/copy-current-url-to-clipboard
  // Verificar melhor solução.
  const buttonShareClick = () => {
    const el = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    return global.alert('Link copied!');
  };

  // Verifica a chave 'favoriteRecipes' no localStorage
  useEffect(() => {
    const favoriteRecipesListStore = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipesListStore !== null) {
      favoriteRecipesListStore.forEach((recipe) => {
        if (recipe.id === id) {
          setheartFavorite(blackHeartIcon);
        }
      });
    }
    setFavoriteRecipesList(favoriteRecipesListStore);
  }, []);

  const mountNewFavoriteRecipe = () => {
    if (currRoute === 'foods') {
      return {
        id: details.idMeal,
        type: 'food',
        nationality: details.strArea,
        category: details.strCategory,
        alcoholicOrNot: '',
        name: details.strMeal,
        image: details.strMealThumb,
      };
    }
    return {
      id: details.idDrink,
      type: 'drink',
      nationality: '',
      category: details.strCategory,
      alcoholicOrNot: details.strAlcoholic,
      name: details.strDrink,
      image: details.strDrinkThumb,
    };
  };

  const hearFavoriteClick = () => {
    const newFavoriteRecipe = mountNewFavoriteRecipe();

    if (heartFavorite === whiteHeartIcon) {
      setheartFavorite(blackHeartIcon);
      if (favoriteRecipesList === null || favoriteRecipesList.length === 0) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([newFavoriteRecipe]));
        setFavoriteRecipesList([newFavoriteRecipe]);
      } else {
        localStorage.setItem('favoriteRecipes',
          JSON.stringify([...favoriteRecipesList, newFavoriteRecipe]));
        setFavoriteRecipesList([...favoriteRecipesList, newFavoriteRecipe]);
      }
    } else {
      setheartFavorite(whiteHeartIcon);
      const newFavorite = favoriteRecipesList.filter((recipe) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
      setFavoriteRecipesList(newFavorite);
    }

    console.log('store', favoriteRecipesList);
  };

  return (
    <div>
      <Input
        type="image"
        src={ heartFavorite }
        alt="whiteHeartIcon-icon"
        testId="Favorite Recipe"
        onClick={ () => hearFavoriteClick() }
      />
      <Input
        type="image"
        src={ shareIcon }
        alt="whiteHeartIcon-icon"
        testId="share-btn"
        onClick={ () => buttonShareClick() }
      />
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
            testId="start-recipe-btn"
            label="Start Recipe"
            onClick={ () => history.push(`/${currRoute}/${id}/in-progress`) }
          />
        </div>
      )}
    </div>
  );
}
