import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const { label, disabled, testId, onClick, src, icon } = props;
  return (
    <button
      src={ src }
      type="button"
      data-testid={ testId }
      disabled={ disabled }
      onClick={ onClick }
    >
      {icon}
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
  src: PropTypes.string,
  icon: PropTypes.element,
};

Button.defaultProps = {
  disabled: false,
  label: null,
  src: null,
  icon: null,
};
