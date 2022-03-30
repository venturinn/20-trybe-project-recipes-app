import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardDrink({ recipesList }) {
  // console.log('recipes em cardDrink', recipesList);

  return (
    <div>
      {recipesList && recipesList.map((recipe, idx) => (
        <div key={ recipe.idDrink } data-testid={ `${idx}-recipe-card` }>
          <Link to={ `/foods/${recipe.idDrink}` }>
            <h4 data-testid={ `${idx}-card-name` }>{ recipe.strDrink }</h4>
            <img
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
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

export default CardDrink;

CardDrink.propTypes = {
  recipesList: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};
