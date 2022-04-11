import { getRecipesByCategory } from '../../services';
import { setSearchBarResults } from '.';
import { setLoading } from './loading';

export const SET_FILTER = 'SET_FILTER';

export const setRecipesByCategory = (currRoute, category) => async (dispatch) => {
  dispatch(setLoading(true));
  getRecipesByCategory(currRoute, category)
    .then((data) => {
      dispatch(setSearchBarResults(data));
      dispatch(setLoading(false));
    });
};

export const setFilterName = (payload) => ({
  type: SET_FILTER,
  payload,
});
