import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function CardFood({ recipesList }) {
  const cardLimit = 11;
  const listToRender = recipesList.filter((item, index) => index <= cardLimit);

  if (listToRender.length === 1) {
    return (<Redirect push to={ `/foods/${listToRender[0].idMeal}` } />);
  }

  return (
    <div>
      {recipesList && listToRender.map((recipe, idx) => (
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
