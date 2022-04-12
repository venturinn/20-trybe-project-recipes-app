import { getCategories } from '../../services';
import { setLoading } from './loading';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const CLEANUP_FILTERS = 'CLEANUP_FILTERS';
const arrayLimit = 5;

const setCategoriesCreator = (payload) => ({
  type: SET_CATEGORIES,
  payload,
});

export const getFiveCategories = (currRoute) => (dispatch) => {
  dispatch(setLoading(true));
  dispatch({ type: CLEANUP_FILTERS });
  getCategories(currRoute)
    .then((data) => data
      .filter((placeholder, index) => index < arrayLimit)
      .map((category) => category.strCategory))
    .then((result) => {
      dispatch(setCategoriesCreator(result));
      dispatch(setLoading(false));
    });
};
