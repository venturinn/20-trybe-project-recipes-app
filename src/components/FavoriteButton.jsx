import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const mountNewFavoriteRecipe = (details) => {
  const name = details.strMeal || details.strDrink;
  const image = details.strMealThumb || details.strDrinkThumb;
  const id = details.idMeal || details.idDrink;
  const type = details.idMeal ? 'food' : 'drink';
  const nationality = details.strArea ? details.strArea : '';
  const alcoholicOrNot = details.strAlcoholic ? details.strAlcoholic : '';
  const category = details.strCategory;

  return {
    name,
    image,
    id,
    type,
    nationality,
    alcoholicOrNot,
    category,
  };
};

function FavoriteButton({ id, details }) {
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

  const hearFavoriteClick = () => {
    const newFavoriteRecipe = mountNewFavoriteRecipe(details);

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
  id: PropTypes.string.isRequired,
  details: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};
