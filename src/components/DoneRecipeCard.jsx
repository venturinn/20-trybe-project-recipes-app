import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { RecipeCard, MyShareButton, InteractDivs } from '../pages/DoneRecipes/style';

export default function DoneRecipeCard(props) {
  const { recipe, index } = props;
  const recipeCategory = useRef(recipe.alcoholicOrNot === ''
    ? `${recipe.nationality} | ${recipe.category}`
    : `${recipe.category} | ${recipe.alcoholicOrNot}`);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [filledDate] = useState(() => {
    if (typeof recipe.doneDate === 'number') {
      const toLocaleString = new Date(recipe.doneDate).toLocaleDateString().split(',')[0];
      const date = toLocaleString.split('/').map((str) => str.padStart(2, '0')).join('/');
      return date;
    }
    return recipe.doneDate;
  });

  return (
    <RecipeCard>
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <div>
        <InteractDivs>
          <MyShareButton
            setIsLinkCopied={ setIsLinkCopied }
            testId={ `${index}-horizontal-share-btn` }
            type={ recipe.type }
            id={ recipe.id }
          />
          {isLinkCopied && <p>Link copied!</p>}
        </InteractDivs>
        <Link to={ `/${recipe.type}s/${recipe.id}` }>
          <p data-testid={ `${index}-horizontal-name` }><strong>{recipe.name}</strong></p>
        </Link>
        <p data-testid={ `${index}-horizontal-top-text` } className="category">
          { recipeCategory.current }
        </p>
        <p data-testid={ `${index}-horizontal-done-date` }>{`Done in: ${filledDate}`}</p>
        <div className="tags-container">
          {recipe.tags.map((tag) => (
            <span
              key={ tag }
              className="recipe-tags"
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </span>))}
        </div>
      </div>
    </RecipeCard>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.shape).isRequired,
  index: PropTypes.number.isRequired,
};
