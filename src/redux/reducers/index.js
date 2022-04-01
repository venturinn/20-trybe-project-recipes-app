import { combineReducers } from 'redux';
import user from './user';
import searchResults from './searchResults';
import category from './category';
import filter from './filters';

const rootReducer = combineReducers({ user, searchResults, category, filter });

export default rootReducer;
