import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoriteButton from './FavoriteButton';
// import ShareButton from './ShareButton';

export default function FavoriteRecipeCard({ recipe, index }) {
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
      <FavoriteButton id={ recipe.id } />
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.shape).isRequired,
  index: PropTypes.number.isRequired,
};
