import { combineReducers } from 'redux';
import user from './user';
import searchBar from './searchBar';

const rootReducer = combineReducers({ user, searchBar });

export default rootReducer;
