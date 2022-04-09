import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from './Input';
import Button from './Button';
import { requestSearchBarRecipes } from '../redux/actions';
import { setFilterName } from '../redux/actions/filters';

const StyledDiv = styled.div`
  height: 100px;
  width: 100vw;
  display: flex;
  flex-wrap: nowrap;
  background-color: #078466;
  padding: 10px 4px 0px 4px ;
  justify-content: flex-start;
  border-bottom-left-radius: 7.5px;
  border-bottom-right-radius: 7.5px;
`;

const ButtonDiv = styled.div`
  width: 20vw;
  height: 80px;
  margin-left: 1.2vw;
  display: flex;
  align-items: center;

  & button {
    color: white;
    background-color: orange;
    border-radius: 5px;
    height: 70px;
    width: 70px;
    border: none;

  }
`;

const InputsDiv = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 70vw;
  align-items: flex-start;
  border-radius: 4px;

  & input {
    margin-right: 1px;
    margin-left: 1px;
  }

  & label {
    color: white;
    font-size: 15px;
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
      <ButtonDiv>
        <Button
          label="Search"
          testId="exec-search-btn"
          onClick={ () => handleSearchBarButtonOnClick() }
        />
      </ButtonDiv>
    </StyledDiv>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  currentRoute: PropTypes.string.isRequired,
};
