import React from 'react';
import { useSelector } from 'react-redux';
import BottomNav from '../../components/BottomNav';
import CardFoodIngredients from '../../components/CardFoodIngredients';
import Header from '../../components/Header';
import Loading from '../../components/Loading';

export default function ExploreIngFoods() {
  const isLoading = useSelector((state) => state.loading);
  return (
    <div>
      <Header />
      {isLoading ? <Loading /> : <CardFoodIngredients />}
      <BottomNav />
    </div>
  );
}
