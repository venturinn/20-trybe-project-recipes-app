import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton({ setIsLinkCopied, type, id }) {
  const buttonShareClick = () => {
    const adressBar = window.location.href;
    const adressBarSplitted = adressBar.split('/');
    const baseAdressBar = [
      adressBarSplitted[0], adressBarSplitted[1], adressBarSplitted[2]].join('/');
    if (type === 'foods' || type === 'food') {
      const newAdressBar = `${baseAdressBar}/foods/${id}`;
      copy(newAdressBar);
    } else {
      const newAdressBar = `${baseAdressBar}/drinks/${id}`;
      copy(newAdressBar);
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
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
