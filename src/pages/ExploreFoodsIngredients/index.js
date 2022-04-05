import React from 'react';
import BottomNav from '../../components/BottomNav';
import CardFoodIngredients from '../../components/CardFoodIngredients';
import Header from '../../components/Header';

export default function index() {
  return (
    <div>
      <Header />
      <CardFoodIngredients />
      <BottomNav />
    </div>
  );
}
