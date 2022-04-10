import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Input from './Input';
import backIcon from '../images/backIcon.svg';

const StyledInput = styled(Input)`
  position: absolute;
  top: 10px;
  left: 10px;
`;

const GoBackButton = ({ onClick }) => (
  <StyledInput
    type="image"
    src={ backIcon }
    onClick={ onClick }
  />
);

GoBackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default GoBackButton;
