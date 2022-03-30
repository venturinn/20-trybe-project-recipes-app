import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const { label, disabled, testId, onClick } = props;
  return (
    <button
      type="button"
      data-testid={ testId }
      disabled={ disabled }
      onClick={ onClick }
    >
      {label}
    </button>
  );
}

export default Button;

Button.propTypes = {
  label: PropTypes.string,
  testId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  disabled: false,
  label: null,
};
