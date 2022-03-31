const extractKeyValuesArr = (array, objectName) => {
  const valuesList = array.reduce((acc, element) => {
    const keyName = element[0];
    const keyValue = element[1];
    if (keyName.includes(objectName)) acc.push(keyValue);
    return acc;
  }, []);
  return valuesList;
};

const cleanAndTreatObjectByIDFromAPI = (objFromAPI) => {
  const arrOnlyWithValidValues = Object.entries(objFromAPI).filter(
    (entrie) => entrie[1] !== '' && entrie[1] !== null,
  );
  const ingredientsList = extractKeyValuesArr(arrOnlyWithValidValues, 'strIngredient');
  const measuresList = extractKeyValuesArr(arrOnlyWithValidValues, 'strMeasure');
  const ingredientsAndMeasures = ingredientsList.map((ingredient, index) => (
    { ingredient, measure: measuresList[index] }));

  let completeRecipeDetails = {};

  arrOnlyWithValidValues.forEach((value) => {
    if (!value[0].includes('strIngredient') && !value[0].includes('strMeasure')) {
      completeRecipeDetails = { ...completeRecipeDetails, [value[0]]: value[1] };
    }
  });
  completeRecipeDetails = { ...completeRecipeDetails, ingredientsAndMeasures };

  return completeRecipeDetails;
};

export default cleanAndTreatObjectByIDFromAPI;
