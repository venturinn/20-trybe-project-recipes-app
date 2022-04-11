import { combineReducers } from 'redux';
import user from './user';
import searchResults from './searchResults';
import category from './category';
import filter from './filters';
import loading from './loading';

const rootReducer = combineReducers(
  { user, searchResults, category, filter, loading },
);

export default rootReducer;
