import React from 'react';
import { useHistory } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';
import Button from '../../components/Button';
import Header from '../../components/Header';

export default function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <section>
        <Header titleToRender="Profile" />
        <p>Profile</p>

        <h2 data-testid="profile-email">{email}</h2>

        <Button
          testId="profile-done-btn"
          label="Done Recipes"
          onClick={ () => history.push('/done-recipes') }
        />

        <Button
          testId="profile-favorite-btn"
          label="Favorite Recipes"
          onClick={ () => history.push('/favorite-recipes') }
        />

        <Button
          testId="profile-logout-btn"
          label="Logout"
          onClick={ handleLogout }
        />
      </section>
      <BottomNav />
    </>
  );
}
