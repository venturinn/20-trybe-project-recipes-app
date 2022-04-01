import { getCategories } from '../../services';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const CLEANUP_FILTERS = 'CLEANUP_FILTERS';
const arrayLimit = 5;

const setCategoriesCreator = (payload) => ({
  type: SET_CATEGORIES,
  payload,
});

export const getFiveCategories = (currRoute) => (dispatch) => {
  dispatch({ type: CLEANUP_FILTERS });
  getCategories(currRoute)
    .then((data) => data
      .filter((placeholder, index) => index < arrayLimit)
      .map((category) => category.strCategory))
    .then((result) => dispatch(setCategoriesCreator(result)));
};
