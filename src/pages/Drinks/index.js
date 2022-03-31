import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';
import Header from '../../components/Header';
import RecipesList from '../../components/RecipesList';
import { setMainPageRecipes, cleanUpMainPage } from '../../redux/actions/mainPage';

export default function Drinks() {
  const dispatch = useDispatch();
  const location = useLocation();
  useState(() => {
    dispatch(cleanUpMainPage());
    dispatch(setMainPageRecipes(location.pathname));
  }, []);

  return (
    <section>
      <Header />
      <RecipesList />
      <BottomNav />
    </section>
  );
}
