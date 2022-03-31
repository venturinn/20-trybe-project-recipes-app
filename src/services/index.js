// const requestAPI = async (url) => {
//   try {
//     const results = await fetch(url);
//     const data = await results.json();
//     return data;
//   } catch (error) {
//     return error;
//   }
// };

// opção refatorada, caso não haja objeções
const requestAPI = (url) => (fetch(url)
  .then((response) => response.json())
  .catch((error) => error));

export const getRecipesForMainPage = (currRoute) => {
  if (currRoute === '/foods') {
    return requestAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  }
  return requestAPI('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
};

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
