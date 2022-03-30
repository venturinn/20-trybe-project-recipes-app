import {
  SEARCH_BAR_RESULTS_TO_SHOW,
} from '../actions';

const INITIAL_STATE = {
  searchBar: [],
};

const searchResults = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCH_BAR_RESULTS_TO_SHOW:
    return { ...state, searchBar: action.payload };
  default:
    return state;
  }
};

export default searchResults;
