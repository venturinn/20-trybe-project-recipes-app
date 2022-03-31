import { setSearchBarResults } from '.';
import { getRecipesForMainPage } from '../../services';

export const CLEANUP_RESULTS = 'CLEANUP_RESULTS';

export const setMainPageRecipes = (currRoute) => (dispatch) => {
  getRecipesForMainPage(currRoute)
    .then((result) => dispatch(setSearchBarResults(result)));
};

export const cleanUpMainPage = () => ({
  type: CLEANUP_RESULTS, payload: [],
});
