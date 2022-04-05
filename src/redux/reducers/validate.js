import { VALIDATE_INGREDIENTS } from '../actions/validateIngredients';

const INITIAL_STATE = false;

const validate = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case VALIDATE_INGREDIENTS:
    return action.payload;
  default:
    return state;
  }
};

export default validate;
