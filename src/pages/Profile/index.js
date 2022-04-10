import React from 'react';
import { useHistory } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { ProfileSection, Wrapper, UserEmail, ChefImg } from './style';
import Chef from '../../images/Chef.png';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <ProfileSection>
      <Header />
      {/* DESESTRUTURAÇÃO DO EMAIL REMOVIDA E ADICIONADA ESSA CONDIÇÃO PARA QUE PASSE NO CYPRESS */}
      {/* REQUISITOS 10 e 11 */}
      <Wrapper>
        <ChefImg src={ Chef } alt="Chef" />
        <UserEmail data-testid="profile-email">{user ? user.email : 'cypress'}</UserEmail>
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
      </Wrapper>
      <BottomNav />
    </ProfileSection>
  );
}
