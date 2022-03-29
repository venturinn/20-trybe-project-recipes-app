import React from 'react';
import Header from '../../components/Header';
import './foods.css';

function Foods() {
  return (
    <section>
      <Header
        titleToRender="Foods"
        searchOptionIsDisabled={ false }
      />
    </section>
  );
}

export default Foods;
