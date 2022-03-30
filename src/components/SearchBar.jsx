import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Input from './Input';
import Button from './Button';
import { requestSearchBarRecipes } from '../redux/actions';

const SEARCH_BAR_INITIAL_STATE = {
  value: '',
  type: '',
};

function SearchBar({ currentRoute }) {
  const dispatch = useDispatch();
  const [searchBar, setSearchBar] = useState(SEARCH_BAR_INITIAL_STATE);

  const handleSearchBarButtonOnClick = () => {
    dispatch(requestSearchBarRecipes(searchBar, currentRoute));
  };

  const handleSearchBarOnChange = ({ name, value }) => {
    setSearchBar({ ...searchBar, [name]: value });
  };

  return (
    <div>
      <div>
        <Input
          label=""
          id="search-bar-input"
          name="value"
          value={ searchBar.value }
          type="text"
          testId="search-input"
          onChange={ ({ target }) => handleSearchBarOnChange(target) }
        />
      </div>
      <Input
        label="Ingredient"
        id="ingredient-input"
        type="radio"
        name="type"
        value="ingredient"
        testId="ingredient-search-radio"
        onChange={ ({ target }) => handleSearchBarOnChange(target) }
      />
      <Input
        label="Name"
        id="name-input"
        type="radio"
        name="type"
        value="name"
        testId="name-search-radio"
        onChange={ ({ target }) => handleSearchBarOnChange(target) }
      />
      <Input
        label="First letter"
        id="first-letter-input"
        type="radio"
        name="type"
        value="firstLetter"
        testId="first-letter-search-radio"
        onChange={ ({ target }) => handleSearchBarOnChange(target) }
      />
      <Button
        label="Search"
        testId="exec-search-btn"
        onClick={ () => handleSearchBarButtonOnClick() }
      />
    </div>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  currentRoute: PropTypes.string.isRequired,
};
