import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import ShareButton from './ShareButton';
import { useDispatch } from 'react-redux';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { removeRecipeFromFavoritesThunk } from '../redux/actions';

export default function FavoriteRecipeCard({ recipe, index }) {
  const dispatch = useDispatch();
  const handleFavoriteButtonOnClick = (id) => {
    console.log(id);
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
        {recipe.alcoholicOrNot === '' ? (
          <p data-testid={ `${index}-horizontal-top-text` }>
            {`${recipe.nationality} - ${recipe.category}` }
          </p>
        ) : (
          <p data-testid={ `${index}-horizontal-top-text` }>
            {`${recipe.category} - ${recipe.alcoholicOrNot}` }
          </p>
        )}
        <h5 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h5>
      </Link>
      <input
        type="image"
        src={ blackHeartIcon }
        alt={ recipe.name }
        onClick={ () => handleFavoriteButtonOnClick(recipe.id) }
      />
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.shape).isRequired,
  index: PropTypes.number.isRequired,
};
