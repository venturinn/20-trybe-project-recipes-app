import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';
import Header from '../../components/Header';
import { ExploreSection, Wrapper } from './style';
import { cleanUpMainPage } from '../../redux/actions/mainPage';

export default function Explore() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cleanUpMainPage());
  });

  const history = useHistory();

  const goToExploreFoods = () => {
    history.push('/explore/foods');
  };

  const goToExploreDrinks = () => {
    history.push('/explore/drinks');
  };

  return (
    <ExploreSection>
      <Header />
      <Wrapper>
        <button
          type="button"
          data-testid="explore-foods"
          onClick={ goToExploreFoods }
        >
          Explore Foods
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ goToExploreDrinks }
        >
          Explore Drinks
        </button>
      </Wrapper>
      <BottomNav />
    </ExploreSection>
  );
}
