import { getRecipesByCategory } from '../../services';
import { setSearchBarResults } from '.';

export const SET_FILTER = 'SET_FILTER';

export const setRecipesByCategory = (currRoute, category) => async (dispatch) => {
  getRecipesByCategory(currRoute, category)
    .then((data) => dispatch(setSearchBarResults(data)));
};

export const setFilterName = (payload) => ({
  type: SET_FILTER,
  payload,
});
