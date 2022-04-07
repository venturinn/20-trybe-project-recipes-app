import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Input from './Input';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { removeRecipeFromFavoriteRecipes } from '../redux/actions';
import ShareButton from './ShareButton';
import { RecipeCard, InteractDivs } from '../pages/DoneRecipes/style';

export default function FavoriteRecipeCard({ recipe, index }) {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const recipeCategory = useRef(recipe.alcoholicOrNot === ''
    ? `${recipe.nationality}/${recipe.category}`
    : `${recipe.category}/${recipe.alcoholicOrNot}`);
  const dispatch = useDispatch();

  const handleFavoriteButtonOnClick = (id) => {
    dispatch(removeRecipeFromFavoriteRecipes(id));
  };

  return (
    <RecipeCard>
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <InteractDivs>
        <Input
          type="image"
          src={ blackHeartIcon }
          alt={ recipe.name }
          testId={ `${index}-horizontal-favorite-btn` }
          onClick={ () => handleFavoriteButtonOnClick(recipe.id) }
        />
        <ShareButton
          setIsLinkCopied={ setIsLinkCopied }
          testId={ `${index}-horizontal-share-btn` }
          type={ recipe.type }
          id={ recipe.id }
        />
        {isLinkCopied && (
          <p>Link copied!</p>)}
      </InteractDivs>
      <div>
        <Link to={ `/${recipe.type}s/${recipe.id}` }>
          <p data-testid={ `${index}-horizontal-name` }><strong>{recipe.name}</strong></p>
        </Link>
        <p data-testid={ `${index}-horizontal-top-text` } className="category">
          { recipeCategory.current }
        </p>
      </div>
    </RecipeCard>
  );
}

FavoriteRecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.shape).isRequired,
  index: PropTypes.number.isRequired,
};
