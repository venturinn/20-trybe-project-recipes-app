import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';
import Header from '../../components/Header';
import RecipesList from '../../components/RecipesList';
import { setMainPageRecipes, cleanUpMainPage } from '../../redux/actions/mainPage';
import Filters from '../../components/Filters';

function Foods() {
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
    <section>
      <Header />
      <Filters />
      <RecipesList />
      <BottomNav />
    </section>
  );
}

export default Foods;
