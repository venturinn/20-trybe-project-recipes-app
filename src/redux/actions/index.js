import {
  getRecipesByIngredient,
  getRecipesByName,
  getRecipesByFirstLetter,
} from '../../services';

const JUST_ONE_CHARACTER = 'Your search must have only 1 (one) character';
const NO_RECIPES_FOUND = 'Sorry, we haven\'t found any recipes for these filters.';

// actions search bar
export const SEARCH_BAR_RESULTS_TO_SHOW = 'SEARCH_BAR_RESULTS_TO_SHOW';

export const setSearchBarResults = (payload) => ({
  type: SEARCH_BAR_RESULTS_TO_SHOW, payload,
});

// refatorar daqui pra baixo
const getRecipesByRouteFromAPI = async ({ value, type }, currRoute) => {
  let recipes = [];
  if (type === 'ingredient') recipes = await getRecipesByIngredient(value, currRoute);
  if (type === 'name') recipes = await getRecipesByName(value, currRoute);
  if (type === 'firstLetter') recipes = await getRecipesByFirstLetter(value, currRoute);
  return recipes;
};

export const requestSearchBarRecipes = (search, currRoute) => async (dispatch) => {
  const { value, type } = search;
  if (type === 'firstLetter' && value.length > 1) return global.alert(JUST_ONE_CHARACTER);

  const recipesList = await getRecipesByRouteFromAPI(search, currRoute);
  console.log('recipesList em actions', recipesList);

  if (currRoute === '/foods') {
    const { meals } = recipesList;
    if (meals === null || meals === undefined) return global.alert(NO_RECIPES_FOUND);
    dispatch(setSearchBarResults(recipesList));
  }

  if (currRoute === '/drinks') {
    const { drinks } = recipesList;
    if (drinks === null || drinks === undefined) return global.alert(NO_RECIPES_FOUND);
    dispatch(setSearchBarResults(recipesList));
  }
};
