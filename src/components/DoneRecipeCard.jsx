import React from 'react';
import PropTypes from 'prop-types';

export default function DoneRecipeCard({ recipe }) {
  console.log(recipe);
  return (
    <div>
      <img src={ recipe.image } alt={ recipe.name } width="110px" height="100px" />
      <p>{ recipe.category }</p>
      <p>{ recipe.alcoholicOrNot }</p>
      <h5>{recipe.name}</h5>
      <p>{`Done in: ${recipe.doneDate}`}</p>
      {recipe.tags.map((tag, index) => (
        <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{ tag }</p>))}
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.shape).isRequired,
};
