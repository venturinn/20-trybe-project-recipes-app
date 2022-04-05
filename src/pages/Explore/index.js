import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BottomNav from '../../components/BottomNav';
import Header from '../../components/Header';
import ExploreHome from '../../components/ExploreHome';
import { cleanUpMainPage } from '../../redux/actions/mainPage';

export default function Explore() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cleanUpMainPage());
  });

  return (
    <section>
      <Header />
      <ExploreHome />
      <BottomNav />
    </section>
  );
}
