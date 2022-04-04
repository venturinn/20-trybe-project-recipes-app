import { SET_DONE_RECIPES_LIST_BY_FILTER } from '../actions';

const INITIAL_STATE = {
  doneRecipesResults: [],
};

const searchFilters = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_DONE_RECIPES_LIST_BY_FILTER:
    return { ...state, doneRecipesResults: action.payload };
  default:
    return state;
  }
};

export default searchFilters;
