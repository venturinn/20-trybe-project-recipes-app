import {
  getRecipesByIngredient,
  getRecipesByName,
  getRecipesByFirstLetter,
  getRecipeDetailsById,
} from '../../services';
import cleanAndTreatObjectByIDFromAPI from '../../services/organizeObjDetails';

const JUST_ONE_CHARACTER = 'Your search must have only 1 (one) character';
const NO_RECIPES_FOUND = 'Sorry, we haven\'t found any recipes for these filters.';

// actions search bar
export const SEARCH_BAR_RESULTS_TO_SHOW = 'SEARCH_BAR_RESULTS_TO_SHOW';

const setSearchBarResults = (payload) => ({
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

export const SET_TREATED_RECIPE_DETAILS_LIST = 'SET_TREATED_RECIPE_DETAILS_LIST';

const setTreatedRecipeDetailsList = (payload) => ({
  type: SET_TREATED_RECIPE_DETAILS_LIST, payload,
});

export const getRecipesDetailsThunk = (id, currRoute) => async (dispatch) => {
  console.log('em:', 'getRecipesDetailsThunk');
  const recipeDetails = await getRecipeDetailsById(id, currRoute);
  if (currRoute === '/foods') {
    const { meals } = recipeDetails;
    const treatedRecipeDetailsList = cleanAndTreatObjectByIDFromAPI(meals[0]);
    dispatch(setTreatedRecipeDetailsList(treatedRecipeDetailsList));
  } if (currRoute === '/drinks') {
    const { drinks } = recipeDetails;
    const treatedRecipeDetailsList = cleanAndTreatObjectByIDFromAPI(drinks[0]);
    dispatch(setTreatedRecipeDetailsList(treatedRecipeDetailsList));
  }
};
