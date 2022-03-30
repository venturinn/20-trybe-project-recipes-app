const requestAPI = async (url) => {
  try {
    const results = await fetch(url);
    const data = await results.json();
    return data;
  } catch (error) {
    return error;
  }
};

// foods API
export const getFoodRecipesByIngredient = (ingredient) => requestAPI(
  `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
);

export const getFoodRecipesByName = (name) => requestAPI(
  `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`,
);

export const getFoodRecipesByFirstLetter = (firstLetter) => requestAPI(
  `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`,
);

// drinks API
export const getDrinkRecipesByIngredient = (ingredient) => requestAPI(
  `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`,
);

export const getDrinkRecipesByName = (name) => requestAPI(
  `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`,
);

export const getDrinkRecipesByFirstLetter = (firstLetter) => requestAPI(
  `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`,
);
