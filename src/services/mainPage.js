import requestAPI from './requestAPI';

const getRecipesForMainPage = (currRoute) => {
  if (currRoute === '/foods') {
    return requestAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  }
  return requestAPI('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
};

export default getRecipesForMainPage;
