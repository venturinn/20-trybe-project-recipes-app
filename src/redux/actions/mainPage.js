import { setSearchBarResults } from '.';
import { getRecipesForMainPage } from '../../services';
import { setLoading } from './loading';

export const CLEANUP_RESULTS = 'CLEANUP_RESULTS';

export const setMainPageRecipes = (currRoute) => (dispatch) => {
  dispatch(setLoading(true));
  getRecipesForMainPage(currRoute)
    .then((result) => {
      dispatch(setSearchBarResults(result));
      dispatch(setLoading(false));
    });
};

export const cleanUpMainPage = () => ({
  type: CLEANUP_RESULTS, payload: [],
});
