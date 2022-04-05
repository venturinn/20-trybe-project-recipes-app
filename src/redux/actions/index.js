import {
  getRecipesByIngredient,
  getRecipesByName,
  getRecipesByFirstLetter,
  getRecipeDetailsById,
} from '../../services';
import cleanAndTreatObjectByIDFromAPI from '../../services/organizeObjDetails';
import {
  getDoneRecipesFromLocalStorage,
  getFavoriteRecipesFromLocalStorage,
} from '../../services/localStorage';

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

// filtros da página de done recipes
export const SET_DONE_RECIPES_LIST_BY_FILTER = 'SET_DONE_RECIPES_LIST_BY_FILTER';

const setDoneRecipesListByFilter = (payload) => ({
  type: SET_DONE_RECIPES_LIST_BY_FILTER, payload,
});

export const SET_FAVORITE_RECIPES_LIST_BY_FILTER = 'SET_FAVORITE_RECIPES_LIST_BY_FILTER';

const setFavoriteRecipesListByFilter = (payload) => ({
  type: SET_FAVORITE_RECIPES_LIST_BY_FILTER, payload,
});

export const showAllDoneRecipes = (tag) => (dispatch) => {
  console.log('tag:', tag);
  if (tag === 'doneRecipes') {
    const result = getDoneRecipesFromLocalStorage('all');
    console.log('em actions, no get', result);
    dispatch(setDoneRecipesListByFilter(result));
  } if (tag === 'favoriteRecipes') {
    dispatch(setFavoriteRecipesListByFilter(getFavoriteRecipesFromLocalStorage()));
  }
};

const filterByDoneFoodRecipes = (tag) => (dispatch) => {
  console.log('tag:', tag);
  if (tag === 'doneRecipes') {
    const result = getDoneRecipesFromLocalStorage('food');
    dispatch(setDoneRecipesListByFiltegetFavoriteRecipesFromLocalStorager(result));
  } if (tag === 'favoriteRecipes') {
    dispatch(setFavoriteRecipesListByFilter(getFavoriteRecipesFromLocalStorage('food')));
  }
};

const filterByDoneDrinkRecipes = (tag) => (dispatch) => {
  console.log('tag:', tag);
  if (tag === 'doneRecipes') {
    dispatch(setDoneRecipesListByFilter(getDoneRecipesFromLocalStorage('drink')));
  } else {
    console.log('luana');
    dispatch(setFavoriteRecipesListByFilter(getFavoriteRecipesFromLocalStorage('drink')));
  }
};

export const doneRecipesFiltersList = [
  { label: 'All',
    testId: 'filter-by-all-btn',
    onClick: (tag) => showAllDoneRecipes(tag) },
  { label: 'Food',
    testId: 'filter-by-food-btn',
    onClick: (tag) => filterByDoneFoodRecipes(tag) },
  { label: 'Drink',
    testId: 'filter-by-drink-btn',
    onClick: (tag) => filterByDoneDrinkRecipes(tag) },
];
