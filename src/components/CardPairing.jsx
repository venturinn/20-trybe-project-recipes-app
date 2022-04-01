import React from 'react';
import PropTypes from 'prop-types';

function CardPairing({ pairingList, type }) {
  const cardLimit = 5;
  if (type === 'drinks') {
    const listToRender = pairingList.meals.filter((_item, index) => index <= cardLimit);
    return (
      <div>
        {listToRender.map((element, index) => (
          <div key={ index }>
            <img
              src={ element.strMealThumb }
              alt={ element.strMeal }
              data-testid={ `${index}-recomendation-card` }
              // inline apenas para melhor visualização
              width="200px"
              height="200px"
            />
            <p>{element.strCategory}</p>
            <p>{element.strMeal}</p>
          </div>
        ))}
      </div>
    );
  }
  const listToRender = pairingList.drinks.filter((_item, index) => index <= cardLimit);
  return (
    <div>
      {listToRender.map((element, index) => (
        <div key={ index }>
          <img
            src={ element.strDrinkThumb }
            alt={ element.strDrink }
            data-testid={ `${index}-recomendation-card` }
            // inline apenas para melhor visualização
            width="200px"
            height="200px"
          />
          <p>{element.strCategory}</p>
          <p>{element.strAlcoholic}</p>
        </div>
      ))}
    </div>
  );
}

export default CardPairing;

CardPairing.propTypes = {
  pairingList: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  type: PropTypes.string.isRequired,
};
