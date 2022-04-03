import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton({ setIsLinkCopied }) {
  const buttonShareClick = () => {
    const adressBar = window.location.href;
    const adressBarSplitted = adressBar.split('/');
    const lastUrlAdress = adressBarSplitted[adressBarSplitted.length - 1];
    if (lastUrlAdress === 'in-progress') {
      const urlToShare = adressBarSplitted
        .filter((adress) => adress !== lastUrlAdress).join('/');
      copy(urlToShare);
    } else {
      copy(adressBar);
    }
    setIsLinkCopied(true);
  };
  return (
    <Input
      type="image"
      src={ shareIcon }
      alt="share-icon"
      testId="share-btn"
      onClick={ () => buttonShareClick() }
    />
  );
}

export default ShareButton;

ShareButton.propTypes = {
  setIsLinkCopied: PropTypes.func.isRequired,
};
