import {
  getFoodRecipesByIngredient,
  getFoodRecipesByName,
  getFoodRecipesByFirstLetter,
  getDrinkRecipesByIngredient,
  getDrinkRecipesByName,
  getDrinkRecipesByFirstLetter,
} from '../../services';

const ALERT_MESSAGE = 'Your search must have only 1 (one) character';
const NO_RECIPES_FOUND = 'Sorry, we haven\'t found any recipes for these filters.';

// actions search bar
export const SEARCH_BAR_RESULTS_TO_SHOW = 'SEARCH_BAR_RESULTS_TO_SHOW';

const setSearchBarResults = (payload) => ({
  type: SEARCH_BAR_RESULTS_TO_SHOW, payload,
});

// refatorar daqui pra baixo
const getRecipesFromFoodAPIBySearchBar = async ({ value, type }) => {
  let result = [];
  if (type === 'ingredient') result = await getFoodRecipesByIngredient(value);
  if (type === 'name') result = await getFoodRecipesByName(value);
  if (type === 'firstLetter') result = await getFoodRecipesByFirstLetter(value);
  return result;
};

const getRecipesFromDrinkAPIBySearchBar = async ({ value, type }) => {
  let result = [];
  if (type === 'ingredient') result = await getDrinkRecipesByIngredient(value);
  if (type === 'name') result = await getDrinkRecipesByName(value);
  if (type === 'firstLetter') result = await getDrinkRecipesByFirstLetter(value);
  return result;
};

export const requestSearchBarRecipes = (search, currRoute) => async (dispatch) => {
  const { value, type } = search;
  if (type === 'firstLetter' && value.length > 1) return global.alert(ALERT_MESSAGE);

  if (currRoute === '/foods') {
    const recipesList = await getRecipesFromFoodAPIBySearchBar(search);
    const { meals } = recipesList;
    if (meals === null || meals === undefined) return global.alert(NO_RECIPES_FOUND);
    dispatch(setSearchBarResults(recipesList));
  }
  if (currRoute === '/drinks') {
    const recipesList = await getRecipesFromDrinkAPIBySearchBar(search);
    const { drinks } = recipesList;
    if (drinks === null || drinks === undefined) return global.alert(NO_RECIPES_FOUND);
    dispatch(setSearchBarResults(recipesList));
  }
};
