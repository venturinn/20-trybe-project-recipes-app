import React from 'react';
import BottomNav from '../../components/BottomNav';
import CardDrinkIngredients from '../../components/CardDrinkIngredients';
import Header from '../../components/Header';

export default function index() {
  return (
    <div>
      <Header />
      <CardDrinkIngredients />
      <BottomNav />
    </div>
  );
}
