import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PairingContainer = styled.div`
  background-color: #F0F7EE;
  height: 220px;
  width: auto;
  display: flex;
  flex-direction: row;
  margin-top: -10px;
  overflow-x: auto;
  overflow-y: hidden;
`;

// overflow: hidden;
// overflow-x: auto;
// overflow-y: hidden;

const Card = styled.div`
  height: 200px;
  padding-top: 20px;
  padding-left: 40px;
  padding-right: 40px;
  background-color:#F2F2F2;
  border-radius: 20px;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.3);
  margin-left:46px;
  margin-right: 46px;
`;

const CardImg = styled.img`
  width:140px;
  height:120px;
  border-radius: 10px;
  object-fit:cover;
`;

const Title = styled.p`
font-size: 20px;
font-weight: bold;
`;

const Category = styled.p`
margin-top:-20px;
font-size: 16px;
`;

function CardPairing({ pairingList, type }) {
  const cardLimit = 5;
  if (type === 'drinks') {
    const listToRender = pairingList.meals.filter((_item, index) => index <= cardLimit);
    return (
      <PairingContainer>
        {listToRender.map((element, index) => (
          <Card data-testid={ `${index}-recomendation-card` } key={ index }>
            <CardImg
              src={ element.strMealThumb }
              alt={ element.strMeal }
            />
            <Title
              data-testid={ `${index}-recomendation-title` }
            >
              {element.strMeal}
            </Title>
            <Category>{element.strCategory}</Category>
          </Card>
        ))}
      </PairingContainer>
    );
  }
  const listToRender = pairingList.drinks.filter((_item, index) => index <= cardLimit);
  return (
    <PairingContainer>
      {listToRender.map((element, index) => (
        <Card data-testid={ `${index}-recomendation-card` } key={ index }>
          <CardImg
            src={ element.strDrinkThumb }
            alt={ element.strDrink }
          />
          <Title data-testid={ `${index}-recomendation-title` }>{element.strDrink}</Title>
          <Category>{element.strAlcoholic}</Category>
        </Card>
      ))}
    </PairingContainer>
  );
}

export default CardPairing;

CardPairing.propTypes = {
  pairingList: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  type: PropTypes.string.isRequired,
};
