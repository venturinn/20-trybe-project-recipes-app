import {
  SET_SEARCH_BAR_VISIBILY,
  SET_SEARCH_BAR_VALUES,
} from '../actions';

const INITIAL_STATE = {
  isVisible: false,
  searchedValue: '',
  type: '',
  results: [],
};

const searchBar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_SEARCH_BAR_VISIBILY:
    return { ...state, isVisible: action.payload };
  case SET_SEARCH_BAR_VALUES:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default searchBar;
