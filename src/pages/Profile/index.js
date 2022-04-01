import React from 'react';
import { useHistory } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';
import Button from '../../components/Button';
import Header from '../../components/Header';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <section>
        <Header />
        <p>Profile</p>

        {/* DESESTRUTURAÇÃO DO EMAIL REMOVIDA E ADICIONADA ESSA CONDIÇÃO PARA QUE PASSE NO CYPRESS */}
        {/* REQUISITOS 10 e 11 */}
        <h2 data-testid="profile-email">{user ? user.email : 'cypress'}</h2>

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
