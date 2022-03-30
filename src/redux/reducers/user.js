const INITIAL_STATE = {
  email: '',
  mealsToken: 0,
  cocktailsToken: 0,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_USER_EMAIL':
    return { ...state, email: action.payload, mealsToken: 1, cocktailsToken: 1 };
  default:
    return state;
  }
};

export default user;
