import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const { label, disabled, testId, onClick, className } = props;
  return (
    <button
      type="button"
      data-testid={ testId }
      disabled={ disabled }
      onClick={ onClick }
      className={ className }
    >
      {label}
    </button>
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
