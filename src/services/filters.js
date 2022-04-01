import requestAPI from './requestAPI';

const getRecipesByCategory = (currRoute, category) => {
  // the mock for tests made this functionality die, ty tests
  // const strForURL = category.replace(/ /g, '_');
  if (currRoute === '/foods') {
    return requestAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  }
  return requestAPI(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
};

export default getRecipesByCategory;
