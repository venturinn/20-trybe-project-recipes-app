import React from 'react';
import PropTypes from 'prop-types';

function CardPairing({ pairingList, type }) {
  const cardLimit = 5;
  if (type === 'drinks') {
    const listToRender = pairingList.meals.filter((_item, index) => index <= cardLimit);
    return (
      <div className="pairing-container">
        {listToRender.map((element, index) => (
          <div data-testid={ `${index}-recomendation-card` } key={ index }>
            <img
              src={ element.strMealThumb }
              alt={ element.strMeal }
              // inline apenas para melhor visualização
              width="185px"
              height="160px"
            />
            <p data-testid={ `${index}-recomendation-title` }>{element.strMeal}</p>
            <p>{element.strCategory}</p>
          </div>
        ))}
      </div>
    );
  }
  const listToRender = pairingList.drinks.filter((_item, index) => index <= cardLimit);
  return (
    <div className="pairing-container">
      {listToRender.map((element, index) => (
        <div data-testid={ `${index}-recomendation-card` } key={ index }>
          <img
            src={ element.strDrinkThumb }
            alt={ element.strDrink }
            // inline apenas para melhor visualização
            width="185px"
            height="160px"
          />
          <p data-testid={ `${index}-recomendation-title` }>{element.strDrink}</p>
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
