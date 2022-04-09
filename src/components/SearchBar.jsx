import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from './Input';
import Button from './Button';
import { requestSearchBarRecipes } from '../redux/actions';
import { setFilterName } from '../redux/actions/filters';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 130px;
  width: 100vw;
  flex-wrap: nowrap;
  background-color: #078466;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: 4px 4px 10px rgb(0 0 0 / 15%);

  & label {
    color: white;
    font-size: 18px;
    border: none;   
  }

  & input {
    border-radius: 10px;
    border: none;
  }

  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: #EF8A17;
    border-radius: 7px;
    height: 20px;
    padding: 16px 20px;
    border: none;
  }
`;

const InputsDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;

  & input {
    margin: 0 5px;
  }
`;

const SEARCH_BAR_INITIAL_STATE = {
  value: '',
  type: '',
};

function SearchBar({ currentRoute }) {
  const dispatch = useDispatch();
  const [searchBar, setSearchBar] = useState(SEARCH_BAR_INITIAL_STATE);

  const handleSearchBarButtonOnClick = () => {
    dispatch(setFilterName(''));
    dispatch(requestSearchBarRecipes(searchBar, currentRoute));
  };

  const handleSearchBarOnChange = ({ name, value }) => {
    setSearchBar({ ...searchBar, [name]: value });
  };

  return (
    <StyledDiv>
      <InputsDiv>
        <Input
          label=""
          id="search-bar-input"
          name="value"
          value={ searchBar.value }
          type="text"
          testId="search-input"
          onChange={ ({ target }) => handleSearchBarOnChange(target) }
        />
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
      </InputsDiv>
      <Button
        label="Search"
        testId="exec-search-btn"
        onClick={ () => handleSearchBarButtonOnClick() }
      />
    </StyledDiv>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  currentRoute: PropTypes.string.isRequired,
};
