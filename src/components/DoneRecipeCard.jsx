import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';

export default function DoneRecipeCard(props) {
  const { recipe, index } = props;
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
      <p data-testid={ `${index}-horizontal-done-date` }>{`Done in: ${filledDate}`}</p>
      {recipe.tags.map((tag) => (
        <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{ tag }</p>))}
      <div>
        <ShareButton
          setIsLinkCopied={ setIsLinkCopied }
          testId={ `${index}-horizontal-share-btn` }
          type={ recipe.type }
          id={ recipe.id }
        />
        {isLinkCopied && <p>Link copied!</p>}
      </div>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.shape).isRequired,
  index: PropTypes.number.isRequired,
};
