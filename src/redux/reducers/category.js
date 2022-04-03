import {
  SET_CATEGORIES,
  CLEANUP_FILTERS,
} from '../actions/category';

const INITIAL_STATE = {
  categories: [],
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CATEGORIES:
    return { categories: action.payload };
  case CLEANUP_FILTERS:
    return { categories: [] };
  default:
    return state;
  }
};

export default categoryReducer;
