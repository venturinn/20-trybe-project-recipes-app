import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const GenericButton = styled.button`
background-color: ${(props) => props.theme.color};
border-radius: 10px;
color: white;
font-size: 20px;
width: 300px;
padding: 10px 70px 10px 70px;
`;

function Button(props) {
  const { label, disabled, testId, onClick, className } = props;
  return (
    <GenericButton
      type="button"
      data-testid={ testId }
      disabled={ disabled }
      onClick={ onClick }
      className={ className }
    >
      {label}
    </GenericButton>
  );
}

export default Button;

Button.propTypes = {
  label: PropTypes.string,
  testId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  label: null,
  className: '',
};
