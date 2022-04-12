import React from 'react';
import { useSelector } from 'react-redux';
import BottomNav from '../../components/BottomNav';
import CardDrinkIngredients from '../../components/CardDrinkIngredients';
import Header from '../../components/Header';
import Loading from '../../components/Loading';

export default function ExploreIngDrinks() {
  const isLoading = useSelector((state) => state.loading);
  return (
    <div>
      <Header />
      {isLoading ? <Loading /> : <CardDrinkIngredients />}
      <BottomNav />
    </div>
  );
}
