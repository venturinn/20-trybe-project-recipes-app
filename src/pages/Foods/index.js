import React from 'react';
import BottomNav from '../../components/BottomNav';
import Header from '../../components/Header';
import './foods.css';
import RecipesList from '../../components/RecipesList';

function Foods() {
  return (
    <section>
      <Header />
      <RecipesList />
      <BottomNav />
    </section>
  );
}

export default Foods;
