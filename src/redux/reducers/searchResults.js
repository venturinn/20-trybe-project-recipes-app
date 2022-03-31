import {
  SEARCH_BAR_RESULTS_TO_SHOW,
} from '../actions';

import {
  CLEANUP_RESULTS,
} from '../actions/mainPage';

const INITIAL_STATE = {
  searchBar: [],
};

const searchResults = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCH_BAR_RESULTS_TO_SHOW:
    return { ...state, searchBar: action.payload };
  case CLEANUP_RESULTS:
    return { searchBar: action.payload };
  default:
    return state;
  }
};

export default searchResults;
