// searchBar actions
export const SET_SEARCH_BAR_VISIBILY = 'SET_SEARCH_BAR_VISIBILY';

export const setSearchBarVisibility = (payload) => ({
  type: SET_SEARCH_BAR_VISIBILY, payload,
});

export const SET_SEARCH_BAR_VALUES = 'SET_SEARCH_BAR_VALUES';

export const setSearchBarValues = (payload) => ({
  type: SET_SEARCH_BAR_VALUES, payload,
});
