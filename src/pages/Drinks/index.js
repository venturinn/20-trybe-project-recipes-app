import React from 'react';
import BottomNav from '../../components/BottomNav';
import Header from '../../components/Header';
import RecipesList from '../../components/RecipesList';

export default function Drinks() {
  return (
    <section>
      <Header />
      <RecipesList />
      <BottomNav />
    </section>
  );
}
