import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const { label, disabled, testId } = props;
  return (
    <button
      type="button"
      data-testid={ testId }
      disabled={ disabled }
    >
      {label}
    </button>
  );
}

export default Button;

Button.propTypes = {
  label: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
};
