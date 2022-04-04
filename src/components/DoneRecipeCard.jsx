import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';

export default function DoneRecipeCard(props) {
  const { recipe, idx } = props;
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [filledDate] = useState(() => {
    const toLocaleString = new Date(recipe.doneDate).toLocaleDateString().split(',')[0];
    const date = toLocaleString.split('/').map((str) => str.padStart(2, '0')).join('/');
    return date;
  });

  return (
    <div>
      <img
        src={ recipe.image }
        alt={ recipe.name }
        data-testid={ `${idx}-horizontal-image` }
        width="110px"
        height="100px"
      />
      <p data-testid={ `${idx}-horizontal-top-text` }>
        { recipe.category }
      </p>
      <p>{ recipe.alcoholicOrNot }</p>
      <h5 data-testid={ `${idx}-horizontal-name` }>{recipe.name}</h5>
      <p data-testid={ `${idx}-horizontal-done-date` }>{`Done in: ${filledDate}`}</p>
      {recipe.tags.map((tag) => (
        <p key={ tag } data-testid={ `${idx}-${tag}-horizontal-tag` }>{ tag }</p>))}
      <div>
        <ShareButton
          setIsLinkCopied={ setIsLinkCopied }
          testId={ `${idx}-horizontal-share-btn` }
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
  idx: PropTypes.number.isRequired,
};
