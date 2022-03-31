import React from 'react';
import oneDrink from '../../mocks/oneDrink';

export const extractListWithArrayValues = (array, objectName) => {
  const arrayEntries = Object.entries(array);
  const valuesList = arrayEntries.reduce((acc, element) => {
    const keyName = element[0];
    const keyValue = element[1];
    if (keyValue === '' || keyValue === null) return acc;
    if (keyName.includes(objectName)) acc.push(keyValue);
    return acc;
  }, []);
  return valuesList;
};

export default function DrinkInProgress() {
  const { drinks } = oneDrink;
  const drinkInfo = drinks[0];

  const ingredientsList = extractListWithArrayValues(drinkInfo, 'strIngredient');
  const measuresList = extractListWithArrayValues(drinkInfo, 'strMeasure');

  const ingredientsAndMeasures = ingredientsList.map((ingredient, index) => (
    { ingredient, measure: measuresList[index] }));
  console.log('mixed', ingredientsAndMeasures);

  return (
    <section>
      <p>DrinkInProgress</p>
      <img
        src={ drinkInfo.strDrinkThumb }
        alt={ drinkInfo.strDrink }
        data-testid="recipe-photo"
        width="200px"
        height="200px"
      />
      <h5 data-testid="recipe-title">{drinkInfo.strDrink}</h5>
      <p data-testid="recipe-category">{drinkInfo.strCategory}</p>
      {ingredientsAndMeasures.map(({ ingredient, measure }, index) => (
        <div key={ ingredient }>
          <p data-testid={ `${index}-ingredient-step` }>
            {ingredient}
            {' '}
            -
            {' '}
            {measure}
          </p>
        </div>
      ))}
      <div>
        <h5>Instructions</h5>
        {drinkInfo.strInstructions}
      </div>
    </section>
  );
}
