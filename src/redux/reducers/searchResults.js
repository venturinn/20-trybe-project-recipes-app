import {
  SEARCH_BAR_RESULTS_TO_SHOW,
  SET_TREATED_RECIPE_DETAILS_LIST,
} from '../actions';

import {
  CLEANUP_RESULTS,
} from '../actions/mainPage';

const INITIAL_STATE = {
  searchBar: [],
  recipeDetails: [],
};

const searchResults = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCH_BAR_RESULTS_TO_SHOW:
    return { ...state, searchBar: action.payload };
  case SET_TREATED_RECIPE_DETAILS_LIST:
    return { ...state, recipeDetails: action.payload };
  case CLEANUP_RESULTS:
    return { searchBar: action.payload };
  default:
    return state;
  }
};
export default searchResults;
