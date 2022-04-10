import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getNationalities, getRecipesByNationality } from '../services/nationalities';
import { setSearchBarResults } from '../redux/actions';
import { setMainPageRecipes, cleanUpMainPage } from '../redux/actions/mainPage';
import Dropdown, { DropdownDiv } from '../pages/ExploreNationalities/style';

export default function DropDownNationalities() {
  const [nationalities, setNationalities] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const asynFunct = async () => {
      const objNationalities = await getNationalities();
      setNationalities(objNationalities.meals);
      return nationalities;
    };
    asynFunct();

    const cleanAndList = () => {
      const cameFrom = location.state ? location.state.from : undefined;
      if (cameFrom !== 'ingredient') {
        dispatch(cleanUpMainPage());
        dispatch(setMainPageRecipes(location.pathname));
      }
    };
    cleanAndList();
  }, []);

  const handleNationality = async (e) => {
    const { value } = e.currentTarget;
    if (value === 'All') {
      return dispatch(setMainPageRecipes('/foods'));
    }
    const recipes = await getRecipesByNationality(value);
    dispatch(setSearchBarResults(recipes));
  };

  return (
    <DropdownDiv>
      <Dropdown
        onChange={ (e) => handleNationality(e) }
        data-testid="explore-by-nationality-dropdown"
      >
        <option data-testid="All-option">All</option>
        {nationalities.map(({ strArea }) => (
          <option
            value={ strArea }
            data-testid={ `${strArea}-option` }
            key={ strArea }
          >
            {strArea}
          </option>
        ))}
      </Dropdown>
    </DropdownDiv>
  );
}
