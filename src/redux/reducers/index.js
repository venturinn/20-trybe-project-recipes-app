import { combineReducers } from 'redux';
import user from './user';
import searchResults from './searchResults';
import category from './category';
import filter from './filters';
import searchFilters from './searchFilters';

const rootReducer = combineReducers(
  { user, searchResults, category, filter, searchFilters },
);

export default rootReducer;
