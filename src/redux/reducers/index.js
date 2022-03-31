import { combineReducers } from 'redux';
import user from './user';
import searchResults from './searchResults';
import category from './category';

const rootReducer = combineReducers({ user, searchResults, category });

export default rootReducer;
