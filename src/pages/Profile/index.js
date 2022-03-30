import React from 'react';
import BottomNav from '../../components/BottomNav';
import Header from '../../components/Header';

export default function Profile() {
  return (
    <>
      <section>
        <Header titleToRender="Profile" />
        <p>Profile</p>
      </section>
    
      <BottomNav />
    </>
  );
}
