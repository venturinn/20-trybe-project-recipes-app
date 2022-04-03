import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton({ setIsLinkCopied }) {
  const buttonShareClick = () => {
    const urlShare = window.location.href;
    copy(urlShare);
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
