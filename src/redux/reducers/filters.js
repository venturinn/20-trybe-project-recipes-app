import {
  SET_FILTER,
} from '../actions/filters';
import { SET_DONE_RECIPES_LIST_BY_FILTER } from '../actions';

const INITIAL_STATE = {
  mainPage: '',
  doneRecipes: [],
  favoriteRecipes: [],
};

const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_FILTER:
    return { ...state, mainPage: action.payload };
  case SET_DONE_RECIPES_LIST_BY_FILTER:
    return { ...state, doneRecipes: action.payload };
  default:
    return state;
  }
};

export default filterReducer;
