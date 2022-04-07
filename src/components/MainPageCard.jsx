import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function MainPageCard({ recipe, currRoute, index }) {
  const recipeName = useRef(recipe.strMeal ? recipe.strMeal : recipe.strDrink);
  const recipeId = useRef(recipe.idMeal ? recipe.idMeal : recipe.idDrink);
  const recipeThumb = useRef(recipe.strMealThumb
    ? recipe.strMealThumb : recipe.strDrinkThumb);

  return (
    <div>
      <div key={ recipeId.current } data-testid={ `${index}-recipe-card` }>
        <Link to={ `${currRoute}/${recipeId.current}` }>
          <h4 data-testid={ `${index}-card-name` }>{ recipeName.current }</h4>
          <img
            src={ recipeThumb.current }
            alt={ recipeName.current }
            data-testid={ `${index}-card-img` }
            // inline apenas para melhor visualização
            width="200px"
            height="200px"
          />
        </Link>
      </div>
    </div>
  );
}

MainPageCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.shape).isRequired,
  currRoute: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
