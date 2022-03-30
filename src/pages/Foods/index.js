import React from 'react';
import Header from '../../components/Header';
import './foods.css';
import RecipesList from '../../components/RecipesList';

function Foods() {
  return (
    <section>
      <Header />
      <RecipesList />
    </section>
  );
}

export default Foods;
