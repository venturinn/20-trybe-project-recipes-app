import requestAPI from './requestAPI';

const getRecipesByCategory = (currRoute, category) => {
  const strForURL = category.replace(/ /g, '_');
  if (currRoute === '/foods') {
    return requestAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strForURL}`);
  }
  return requestAPI(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${strForURL}`);
};

export default getRecipesByCategory;
