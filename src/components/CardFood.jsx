import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardFood({ recipesList }) {
  // console.log('recipesList em cardFood', recipesList);

  return (
    <div>
      {recipesList && recipesList.map((recipe, idx) => (
        <div key={ recipe.idMeal } data-testid={ `${idx}-recipe-card` }>
          <Link to={ `/foods/${recipe.idMeal}` }>
            <h4 data-testid={ `${idx}-card-name` }>{ recipe.strMeal }</h4>
            <img
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
              data-testid={ `${idx}-card-img` }
              // inline apenas para melhor visualização
              width="200px"
              height="200px"
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CardFood;

CardFood.propTypes = {
  recipesList: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};
