import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CardDrink({ recipesList }) {
  // console.log('recipes em cardDrink', recipesList);

  const cardLimit = 11;
  const listToRender = recipesList.filter((_item, index) => index <= cardLimit);

  const filter = useSelector((state) => state.filter);
  const shouldRedirect = filter === '';
  if (listToRender.length === 1 && shouldRedirect) {
    return (<Redirect push to={ `/drinks/${listToRender[0].idDrink}` } />);
  }

  return (
    <div>
      {recipesList && listToRender.map((recipe, idx) => (
        <div key={ recipe.idDrink } data-testid={ `${idx}-recipe-card` }>
          <Link to={ `/drinks/${recipe.idDrink}` }>
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
