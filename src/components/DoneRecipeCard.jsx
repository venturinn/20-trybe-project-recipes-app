import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';

export default function DoneRecipeCard(props) {
  const { recipe, idx } = props;
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  console.log(recipe);
  return (
    <div>
      <img
        src={ recipe.image }
        alt={ recipe.name }
        data-testid={ `${idx}-horizontal-image` }
        width="110px"
        height="100px"
      />
      <p>{ recipe.category }</p>
      <p>{ recipe.alcoholicOrNot }</p>
      <h5>{recipe.name}</h5>
      <p>{`Done in: ${recipe.doneDate}`}</p>
      {recipe.tags.map((tag, index) => (
        <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{ tag }</p>))}
      <div>
        <ShareButton
          setIsLinkCopied={ setIsLinkCopied }
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
