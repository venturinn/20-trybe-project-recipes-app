import {
  SET_FILTER,
} from '../actions/filters';

const INITIAL_STATE = {
  filter: [],
};

const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_FILTER:
    return action.payload;
  default:
    return state;
  }
};

export default filterReducer;
