import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import ShareButton from './ShareButton';
import Input from './Input';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { removeRecipeFromFavoritesThunk } from '../redux/actions';

export default function FavoriteRecipeCard({ recipe, index }) {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const recipeCategory = useRef('');
  const dispatch = useDispatch();

  useEffect(() => {
    recipeCategory.current = recipe.alcoholicOrNot === ''
      ? `${recipe.nationality} - ${recipe.category}`
      : `${recipe.category} - ${recipe.alcoholicOrNot}`;
  }, []);

  const handleFavoriteButtonOnClick = (id) => {
    dispatch(removeRecipeFromFavoritesThunk(id));
  };

  return (
    <div>
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
          width="110px"
          height="100px"
        />
        <p data-testid={ `${index}-horizontal-top-text` }>
          {recipeCategory.current }
        </p>
        <h5 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h5>
      </Link>
      <ShareButton
        id={ recipe.id }
        type={ recipe.type }
        setIsLinkCopied={ setIsLinkCopied }
        testId={ `${index}-horizontal-share-btn` }
      />
      {isLinkCopied && <p>Link copied!</p>}
      <Input
        type="image"
        src={ blackHeartIcon }
        alt={ recipe.name }
        data-testid={ `${index}-horizontal-favorite-btn` }
        onClick={ () => handleFavoriteButtonOnClick(recipe.id) }
      />
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.shape).isRequired,
  index: PropTypes.number.isRequired,
};
