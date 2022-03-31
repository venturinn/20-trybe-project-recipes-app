import getRecipesForMainPage from './mainPage';
import getCategories from './category';
import requestAPI from './requestAPI';

export const getRecipesByIngredient = (ingredient, currRoute) => {
  if (currRoute === '/foods') {
    return requestAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  } if (currRoute === '/drinks') {
    return requestAPI(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  }
};

export const getRecipesByName = (name, currRoute) => {
  if (currRoute === '/foods') {
    return requestAPI(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  } if (currRoute === '/drinks') {
    return requestAPI(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  }
};

export const getRecipesByFirstLetter = (firstLetter, currRoute) => {
  if (currRoute === '/foods') {
    return requestAPI(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  } if (currRoute === '/drinks') {
    return requestAPI(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  }
};

export { getRecipesForMainPage, getCategories };
