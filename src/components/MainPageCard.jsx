import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from '../pages/Foods/style';

export default function MainPageCard({ recipe, index }) {
  const recipeName = useRef(recipe.strMeal ? recipe.strMeal : recipe.strDrink);
  const recipeId = useRef(recipe.idMeal ? recipe.idMeal : recipe.idDrink);
  const recipeThumb = useRef(recipe.strMealThumb
    ? recipe.strMealThumb : recipe.strDrinkThumb);

  const route = recipe.idMeal
    ? `/foods/${recipe.idMeal}`
    : `/drinks/${recipe.idDrink}`;

  return (
    <Card key={ recipeId.current } data-testid={ `${index}-recipe-card` }>
      <Link to={ route }>
        <img
          src={ recipeThumb.current }
          alt={ recipeName.current }
          data-testid={ `${index}-card-img` }
        />
        <div className="recipe-description">
          {/* <p>{recipe.strTags}</p> */}
          <h5 data-testid={ `${index}-card-name` }>{ recipeName.current }</h5>
        </div>
      </Link>
    </Card>
  );
}

MainPageCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.shape).isRequired,
  index: PropTypes.number.isRequired,
};
