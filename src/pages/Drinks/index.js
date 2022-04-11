import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';
import Header from '../../components/Header';
import RecipesList from '../../components/RecipesList';
import Filters from '../../components/Filters';
import { setMainPageRecipes, cleanUpMainPage } from '../../redux/actions/mainPage';
import Loading from '../../components/Loading';

export default function Drinks() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoading = useSelector((state) => state.loading);
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
      {isLoading ? <Loading /> : <RecipesList />}
      <BottomNav />
    </section>
  );
}
