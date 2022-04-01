import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton({ isDrinkOrFood, id, details }) {
  const [heartFavorite, setheartFavorite] = useState(whiteHeartIcon);
  const [favoriteRecipesList, setFavoriteRecipesList] = useState(null);

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
    if (isDrinkOrFood === 'foods') {
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
  };

  return (
    <Input
      type="image"
      src={ heartFavorite }
      alt="whiteHeartIcon-icon"
      testId="favorite-btn"
      onClick={ () => hearFavoriteClick() }
    />
  );
}

export default FavoriteButton;

FavoriteButton.propTypes = {
  isDrinkOrFood: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  details: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};
