import {
  SET_FILTER,
} from '../actions/filters';
import {
  SET_DONE_RECIPES_LIST,
  SET_FAVORITE_RECIPES_LIST,
} from '../actions';

const INITIAL_STATE = {
  mainPage: '',
  doneRecipes: {
    results: [],
    tag: 'doneRecipes',
  },
  favoriteRecipes: {
    results: [],
    tag: 'favoriteRecipes',
  },
};

const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_FILTER:
    return { ...state, mainPage: action.payload };
  case SET_DONE_RECIPES_LIST:
    return { ...state, doneRecipes: { ...state.doneRecipes, results: action.payload } };
  case SET_FAVORITE_RECIPES_LIST:
    return {
      ...state, favoriteRecipes: { ...state.favoriteRecipes, results: action.payload } };
  default:
    return state;
  }
};

export default filterReducer;
