import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import DropDownNationalities from '../../components/DropdownNationalities';
import RecipesList from '../../components/RecipesList';
import { setMainPageRecipes, cleanUpMainPage } from '../../redux/actions/mainPage';

export default function ExploreNationalities() {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    const cameFrom = location.state ? location.state.from : undefined;
    if (cameFrom !== 'ingredient') {
      dispatch(cleanUpMainPage());
      dispatch(setMainPageRecipes(location.pathname));
    }
  }, []);

  return (
    <div>
      <Header />
      <DropDownNationalities />
      <RecipesList />
      <BottomNav />
    </div>
  );
}
