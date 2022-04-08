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
  background-color:#02484B;
  padding: 10px 4px 0px 4px ;
  justify-content: center;
  align-items: center;

  & label {
    color: white;
    font-size: 18px;
    
  }

  & button {
    color: white;
    background-color: orange;
    border-radius: 5px;
    height: 50px;
  }
`;

const ButtonDiv = styled.div`
  width: 20vw;
  height: 80px;
  margin-top: 4vh;

  & button {
    margin-left: 10px;
  }
`;

const InputsDiv = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 80vw;
  align-items: flex-start;

  & input {
    margin-right: 5px;
    margin-left: 5px;
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
